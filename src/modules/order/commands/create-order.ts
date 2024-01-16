import { HttpStatus, HttpException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PaypalService } from 'src/global/services/mail/paypal.service';
import { OrderService } from '../order.service';
import { ProductService } from 'src/modules/product/product.service';

import {
  CreateOrderRequestDto,
  CreateOrderItemsDto,
  CreateOrderResponseDto,
} from '../dto';
import { PaymentMethod } from 'src/global/models';
import {
  OrderEntity,
  OrderItemEntity,
  ProductEntity,
} from 'src/global/entities';
import { v4 as uuidV4 } from 'uuid';

export class CreateOrderCommand {
  constructor(public readonly data: CreateOrderRequestDto) {}
}

@CommandHandler(CreateOrderCommand)
export class CreateOrderCommandHandler
  implements ICommandHandler<CreateOrderCommand>
{
  constructor(
    private readonly paypalService: PaypalService,
    private readonly orderService: OrderService,
    private readonly productService: ProductService,
  ) {}

  async execute(
    command: CreateOrderCommand,
  ): Promise<CreateOrderResponseDto | void> {
    const { paymentMethod, paymentOrderId, promoCode, items } = command.data;
    if (paymentMethod !== PaymentMethod.PAYPAL) {
      return;
    }
    // const orderVerified = await this.paypalService.verifyOrder(paymentOrderId);

    // if (!orderVerified) {
    //   throw new HttpException('Payment is not found', HttpStatus.BAD_REQUEST);
    // }

    const products = await this.productService.getProducts(
      items.map((item) => item.productSku),
    );

    const orderPayload = new OrderEntity();
    orderPayload.id = uuidV4();

    if (promoCode) {
      const promo = await this.orderService.getPromoDiscount(promoCode);
      if (promo.dicountAmount > 0) {
        orderPayload.promoCode = promoCode;
        orderPayload.promoDiscount = promo.dicountAmount;
      }
    }

    const order = await this.orderService.createOrder(orderPayload);

    const orderItems = this.getOrderItem(items, products, orderPayload.id);

    await this.orderService.createOrderItem(orderItems);

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
}
