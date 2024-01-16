import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import Decimal from 'decimal.js';
import { OrderItemEntity, OrderEntity } from 'src/global/entities';
import dayjs from 'dayjs';
import { OrderStatus } from 'src/global/models';
@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private ordersRepository: Repository<OrderEntity>,
    @InjectRepository(OrderItemEntity)
    private orderItemsRepository: Repository<OrderItemEntity>,
  ) {}

  async createOrder(order: OrderEntity): Promise<OrderEntity> {
    return this.ordersRepository.save(order);
  }
  async createOrderItem(items: OrderItemEntity[]): Promise<OrderItemEntity[]> {
    return this.ordersRepository.save(items);
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
