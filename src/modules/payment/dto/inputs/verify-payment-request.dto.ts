import {
  IsNotEmpty,
  MinLength,
  IsEnum,
  IsString,
  MaxLength,
} from 'class-validator';
import { PaymentGateway } from 'src/global/models';

export class VerifyPaymentRequestDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  orderId!: string;

  @IsNotEmpty()
  @IsEnum(PaymentGateway)
  paymentGateway!: PaymentGateway;
}
