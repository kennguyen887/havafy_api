import { Exclude, Expose, Type } from 'class-transformer';

export class GetTaskListItemDto {
  @Expose()
  id!: string;

  @Expose()
  name!: string;

  @Expose()
  sku!: string;

  @Expose()
  @Type(() => Number)
  price!: number;

  @Expose()
  @Type(() => Number)
  basePrice!: number;

  @Expose()
  @Type(() => Number)
  quantity!: number;

  @Expose()
  description!: string;

  @Expose()
  thumbnail!: string;
}

@Exclude()
export class GetTaskListResponseDto {
  @Expose()
  data!: GetTaskListItemDto[];
}
