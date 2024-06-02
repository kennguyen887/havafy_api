import { Exclude, Expose } from 'class-transformer';
import { ItemAttributes, ItemStatus } from 'src/global/models';
import { PaginationResponse } from 'src/global/models';

export class GetItemListItemDto {
  @Expose()
  id!: string;

  @Expose()
  userId!: string;

  @Expose()
  title!: string;

  @Expose()
  description!: string;

  @Expose()
  status!: ItemStatus;

  @Expose()
  attributes!: ItemAttributes;
}

@Exclude()
export class GetItemListResponseDto extends PaginationResponse {
  constructor(data: GetItemListItemDto[], pagination: PaginationResponse) {
    super(pagination);
    this.data = data;
  }

  @Expose()
  data!: GetItemListItemDto[];
}
