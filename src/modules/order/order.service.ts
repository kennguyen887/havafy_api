import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Decimal from 'decimal.js';
import {
  OrderItemEntity,
  OrderEntity,
  ProductEntity,
} from 'src/global/entities';
import {
  CreateOrderRequestDto,
  CreateOrderItemsDto,
  CreateOrderResponseDto,
} from './dto';
import dayjs from 'dayjs';
import { OrderStatus } from 'src/global/models';
import { v4 as uuidV4 } from 'uuid';
import { ProductService } from 'src/modules/product/product.service';
@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private ordersRepository: Repository<OrderEntity>,
    @InjectRepository(OrderItemEntity)
    private orderItemsRepository: Repository<OrderItemEntity>,
    private readonly productService: ProductService,
  ) {}

  async createOrder(
    data: CreateOrderRequestDto,
  ): Promise<CreateOrderResponseDto> {
    const { paymentMethod, paymentOrderId, promoCode, items } = data;
    const products = await this.productService.getProducts(
      items.map((item) => item.productSku),
    );

    let orderPayload = new OrderEntity();
    orderPayload = {
      ...orderPayload,
      id: uuidV4(),
      paymentMethod,
      paymentOrderId,
      promoCode: promoCode || null,
    };

    if (promoCode) {
      const promo = await this.getPromoDiscount(promoCode);
      if (promo.dicountAmount > 0) {
        orderPayload.promoCode = promoCode;
        orderPayload.promoDiscount = promo.dicountAmount;
      }
    }

    const order = await this.ordersRepository.save(orderPayload);
    const orderItems = this.getOrderItem(items, products, orderPayload.id);
    await this.orderItemsRepository.save(orderItems);
    return {
      orderId: order.id,
      status: order.status,
    };
  }

  getOrderItem(
    items: CreateOrderItemsDto[],
    products: ProductEntity[],
    orderId: string,
  ) {
    const mapProducts = products.reduce((acc, product: ProductEntity) => {
      acc[product.sku] = product;
      return acc;
    }, {} as Record<string, ProductEntity>);

    return items.map((item) => {
      const product = mapProducts[item.productSku];
      return {
        orderId,
        quantity: item.quantity,
        name: product.name,
        basePrice: product.basePrice,
        sku: product.sku,
        price: product.price,
      };
    });
  }
  async getPromoDiscount(code: string): Promise<{
    dicountAmount: number;
    message: string;
  }> {
    const promoCodes = [
      {
        code: 'D20TTS20240501',
        dicountAmount: 20,
        dicountPercent: null,
        maxUsed: 5,
        startedAt: dayjs('2024-01-15').toDate(),
        expiredAt: dayjs('2024-05-15').toDate(),
      },
    ];
    // Find a valid promo code
    const promo = promoCodes.find((promo) => {
      return code === promo.code;
    });
    let dicountAmount = 0;

    if (!promo) {
      return {
        dicountAmount,
        message: 'The promo code is not found.',
      };
    }

    if (dayjs().isAfter(dayjs(promo.expiredAt))) {
      return {
        dicountAmount,
        message: 'The promo code has expired.',
      };
    }

    const usedCount = await this.ordersRepository
      .createQueryBuilder('order')
      .where('order.created_at >= :startDate', { startDate: promo.startedAt })
      .andWhere('order.promo_code = :promoCode', { promoCode: code })
      .andWhere('order.status = :orderStatus', {
        orderStatus: OrderStatus.COMPLETED,
      })
      .getCount();

    if (usedCount > promo.maxUsed) {
      return {
        dicountAmount,
        message: 'The promo code has ended.',
      };
    }

    dicountAmount = new Decimal(dicountAmount).toNumber();

    return {
      dicountAmount,
      message: 'The promo code applied',
    };
  }
}
