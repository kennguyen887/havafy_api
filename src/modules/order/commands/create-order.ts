import { HttpStatus, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PaypalService } from 'src/global/services/mail/paypal.service';

import { CreateOrderRequestDto, CreateOrderResponseDto } from '../dto';
import { PaymentMethod } from 'src/global/models';

export class CreateOrderCommand {
  constructor(public readonly data: CreateOrderRequestDto) {}
}

@CommandHandler(CreateOrderCommand)
export class CreateOrderCommandHandler
  implements ICommandHandler<CreateOrderCommand>
{
  constructor(private readonly paypalService: PaypalService) {}

  async execute(
    command: CreateOrderCommand,
  ): Promise<CreateOrderResponseDto | void> {
    const { paymentMethod, paymentOrderId, items } = command.data;
    if (paymentMethod !== PaymentMethod.PAYPAL) {
      return;
    }
    const orderVerified = await this.paypalService.verifyOrder(paymentOrderId);

    if (!orderVerified) {
      throw new HttpException('Payment is not found', HttpStatus.BAD_REQUEST);
    }
  }
}
