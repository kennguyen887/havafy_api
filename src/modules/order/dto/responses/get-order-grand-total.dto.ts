import { Exclude, Expose, Type } from 'class-transformer';
import { Nullable } from 'src/global/utils/types';

@Exclude()
export class GetOrdeItemResDto {
  @Expose()
  name!: string;

  @Expose()
  @Type(() => Number)
  basePrice!: Nullable<number>;

  @Expose()
  @Type(() => Number)
  price!: number;

  @Expose()
  @Type(() => Number)
  quantity!: number;

  @Expose()
  @Type(() => Number)
  total!: number;

  @Expose()
  sku!: string;
}

@Exclude()
export class GetOrderGrandTotalResDto {
  @Expose()
  hasPromoCodeValid!: boolean;

  @Expose()
  items!: GetOrdeItemResDto[];

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
