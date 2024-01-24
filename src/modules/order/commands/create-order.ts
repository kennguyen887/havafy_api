import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OrderService } from '../order.service';

import { CreateOrderRequestDto, CreateOrderResponseDto } from '../dto';

export class CreateOrderCommand {
  constructor(
    public readonly userId: string,
    public readonly data: CreateOrderRequestDto,
  ) {}
}

@CommandHandler(CreateOrderCommand)
export class CreateOrderCommandHandler
  implements ICommandHandler<CreateOrderCommand>
{
  constructor(private readonly orderService: OrderService) {}

  async execute(
    command: CreateOrderCommand,
  ): Promise<CreateOrderResponseDto | void> {
    const { userId } = command;

    return this.orderService.createOrder(userId, command.data);
  }
}
