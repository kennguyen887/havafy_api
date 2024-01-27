import { Exclude, Expose } from 'class-transformer';
import { OrderStatus } from 'src/global/models';

@Exclude()
export class CreateOrderResponseDto {
  @Expose()
  orderId!: string;

  @Expose()
  orderNumber!: string;

  @Expose()
  status!: OrderStatus;
}
