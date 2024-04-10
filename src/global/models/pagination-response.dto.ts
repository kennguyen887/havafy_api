import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class PaginationResponse {
  constructor(pagination: PaginationResponse) {
    Object.assign(this, pagination);
  }

  @Expose()
  public total = 0;

  @Expose()
  public pageIndex = 1;

  @Expose()
  public pageSize = 10;
}
