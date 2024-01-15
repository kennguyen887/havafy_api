import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItemEntity, OrderEntity } from 'src/global/entities';
import dayjs from 'dayjs';
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

  getPromoDiscount(amount: number, usedCount: number) {
    const promoCodes = [
      {
        code: 'D20TTS20240501',
        dicountAmount: 20,
        remainCount: 5,
        expiredAt: dayjs('2024-05-15').toDate(),
      },
    ];

    // Find a valid promo code
    const validPromoCode = promoCodes.find((promo) => {
      return promo.remainCount > 0 && dayjs().isBefore(promo.expiredAt);
    });

    // If a valid promo code is found, apply the discount
    if (validPromoCode) {
      const discountedAmount = Math.max(
        amount - validPromoCode.discountAmount,
        0,
      );
      validPromoCode.remainCount--; // Decrease the remaining count of the promo code
      return discountedAmount;
    }

    // If no valid promo code is found, return the original amount
    return amount;
  }
}
