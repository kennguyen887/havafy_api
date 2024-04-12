import { Exclude, Expose, Type } from 'class-transformer';
import { Nullable } from 'src/global/utils';
import { PaginationResponse } from 'src/global/models';

@Exclude()
export class GetMediaResponseDto {
  @Expose()
  id!: string;

  @Expose()
  title!: Nullable<string>;

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
export class GetMediaListResponseDto extends PaginationResponse {
  constructor(data: GetMediaResponseDto[], pagination: PaginationResponse) {
    super(pagination);
    this.data = data;
  }

  @Expose()
  @Type(() => GetMediaResponseDto)
  public data: GetMediaResponseDto[] = [];
}
