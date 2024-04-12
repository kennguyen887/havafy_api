import { Exclude, Expose, Type } from 'class-transformer';
import { Nullable } from 'src/global/utils';
import { PaginationResponse } from 'src/global/models';

@Exclude()
export class GetCommentResponseDto {
  @Expose()
  id!: string;

  @Expose()
  userId!: string;

  @Expose()
  title!: Nullable<string>;

  @Expose()
  description!: string;

  @Expose()
  url!: string;

  @Expose()
  featureId!: string;

  @Expose()
  featureType!: string;

  @Expose()
  status!: string;

  @Expose()
  createdAt!: string;
}

@Exclude()
export class GetCommentListResponseDto extends PaginationResponse {
  constructor(data: GetCommentResponseDto[], pagination: PaginationResponse) {
    super(pagination);
    this.data = data;
  }

  @Expose()
  @Type(() => GetCommentResponseDto)
  public data: GetCommentResponseDto[] = [];
}
