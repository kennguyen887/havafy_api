import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderRequestDto, CreateOrderResponseDto } from './dto';
import { CreateOrderCommand } from './commands';

@ApiTags('Order')
@Controller('Order')
export class OrderController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async verifyTransaction(
    @Body() data: CreateOrderRequestDto,
  ): Promise<CreateOrderResponseDto> {
    return this.commandBus.execute(new CreateOrderCommand(data));
  }
}
