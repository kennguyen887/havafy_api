import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderRequestDto, CreateOrderResponseDto } from './dto';
import { CreateOrderCommand } from './commands';
import { GetJwtUserPayloadDto } from '../user/dto';
import { JwtAuthGuard } from '../user/guards/jwt-auth/jwt-auth.guard';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async verifyTransaction(
    @Body() data: CreateOrderRequestDto,
    @Request() req: GetJwtUserPayloadDto,
  ): Promise<CreateOrderResponseDto> {
    const { user } = req;
    return this.commandBus.execute(new CreateOrderCommand(user.id, data));
  }
}
