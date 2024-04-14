import { Exclude, Expose, Type } from 'class-transformer';
import { TaskAttributes } from 'src/global/models';
import { PaginationResponse } from 'src/global/models';

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
  attributes!: TaskAttributes;

  @Expose()
  thumbnail!: string;
}

@Exclude()
export class GetTaskListResponseDto extends PaginationResponse {
  constructor(data: GetTaskListItemDto[], pagination: PaginationResponse) {
    super(pagination);
    this.data = data;
  }

  @Expose()
  data!: GetTaskListItemDto[];
}
