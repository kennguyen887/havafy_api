import { Exclude, Expose } from 'class-transformer';
import { ProfileAttributes, ProfileStatus } from 'src/global/models';
import { PaginationResponse } from 'src/global/models';

export class GetProfileListProfileDto {
  @Expose()
  id!: string;

  @Expose()
  userId!: string;

  @Expose()
  title!: string;

  @Expose()
  description!: string;

  @Expose()
  status!: ProfileStatus;

  @Expose()
  attributes!: ProfileAttributes;
}

@Exclude()
export class GetProfileListResponseDto extends PaginationResponse {
  constructor(data: GetProfileListProfileDto[], pagination: PaginationResponse) {
    super(pagination);
    this.data = data;
  }

  @Expose()
  data!: GetProfileListProfileDto[];
}
