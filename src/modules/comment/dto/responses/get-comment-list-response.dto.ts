import { Exclude, Expose, Type } from 'class-transformer';

export class GetCommentListItemDto {
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
export class GetCommentListResponseDto {
  @Expose()
  data!: GetCommentListItemDto[];
}
