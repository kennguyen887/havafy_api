import { Exclude, Expose, Type } from 'class-transformer';
import { Nullable } from 'src/global/utils/types';

@Exclude()
export class GetOrderGrandTotalResDto {
  @Expose()
  hasPromoCodeValid!: boolean;

  @Expose()
  @Type(() => Number)
  promoDiscount!: Nullable<number>;

  @Expose()
  @Type(() => Number)
  subtotal!: number;

  @Expose()
  @Type(() => Number)
  discountTotal!: number;

  @Expose()
  @Type(() => Number)
  grandTotal!: number;
}
