import { HttpStatus, HttpException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PaypalService } from 'src/global/services/mail/paypal.service';
import { OrderService } from '../order.service';

import { CreateOrderRequestDto, CreateOrderResponseDto } from '../dto';
import { PaymentMethod } from 'src/global/models';

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
  ) {}

  async execute(
    command: CreateOrderCommand,
  ): Promise<CreateOrderResponseDto | void> {
    // const { paymentMethod, paymentOrderId } = command.data;

    // if (paymentMethod !== PaymentMethod.PAYPAL) {
    //   return;
    // }

    // const orderVerified = await this.paypalService.verifyOrder(paymentOrderId);

    // if (!orderVerified) {
    //   throw new HttpException('Payment is not found', HttpStatus.BAD_REQUEST);
    // }

    return this.orderService.createOrder(command.data);
  }
}
