import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class VerifyPaymentResponseDto {
  @Expose()
  verified!: boolean;
}
