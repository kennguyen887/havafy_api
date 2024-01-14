import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { VerifyPaymentRequestDto, VerifyPaymentResponseDto } from './dto';
import { VerifyTractionPaypalPaymentCommand } from './commands';

@ApiTags('payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  async verifyTransaction(
    @Body() data: VerifyPaymentRequestDto,
  ): Promise<VerifyPaymentResponseDto> {
    return this.commandBus.execute(
      new VerifyTractionPaypalPaymentCommand(data),
    );
  }
}
