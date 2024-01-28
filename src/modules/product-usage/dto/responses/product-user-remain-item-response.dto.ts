import { Exclude, Expose, Type } from 'class-transformer';

export class GetProductRemainItemDto {
  @Expose()
  sku!: string;

  @Expose()
  @Type(() => Number)
  remainAmount!: number;
}

@Exclude()
export class GetProductRemainResponseDto {
  @Expose()
  data!: GetProductRemainItemDto[];
}
