import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateOrderRequestDto,
  CreateOrderResponseDto,
  GetOrderGrandTotalRequestDto,
  GetOrderGrandTotalResDto,
} from './dto';
import { CreateOrderCommand } from './commands';
import { GetOrderGrandTotalQuery } from './queries';
import { GetJwtUserPayloadDto } from '../user/dto';
import { JwtAuthGuard } from '../user/guards/jwt-auth/jwt-auth.guard';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createOrder(
    @Body() data: CreateOrderRequestDto,
    @Request() req: GetJwtUserPayloadDto,
  ): Promise<CreateOrderResponseDto> {
    const { user } = req;
    return this.commandBus.execute(new CreateOrderCommand(user.id, data));
  }

  @Post('getGrandTotal')
  async getOrderGrandTotal(
    @Body() data: GetOrderGrandTotalRequestDto,
  ): Promise<GetOrderGrandTotalResDto> {
    return this.queryBus.execute(new GetOrderGrandTotalQuery(null, data));
  }
}
