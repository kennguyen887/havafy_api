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
import { ProductEntity } from 'src/global/entities';

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
    const mapProducts = products.reduce((acc, product: ProductEntity) => {
      acc[product.sku] = product;
      return acc;
    }, {} as Record<string, ProductEntity>);
    const order = await this.orderService.createOrder({
      items: this.getOrderItem(items),
    });
  }

  getOrderItem(
    items: CreateOrderItemsDto[],
    mapProducts: Record<string, ProductEntity>,
  ) {
    return items.map((item) => {
      return {
        ...item,
        price: mapProducts[item.productSku].price,
      };
    });
  }
}
