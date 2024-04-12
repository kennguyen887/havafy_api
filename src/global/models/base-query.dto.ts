import { Type } from 'class-transformer';
import { IsOptional, Max, Min } from 'class-validator';

export class BaseQueryDto {
  @IsOptional()
  @Min(1)
  @Type(() => Number)
  pageIndex = 1;

  @IsOptional()
  @Min(1)
  @Max(200)
  @Type(() => Number)
  pageSize = 50;

  get offset(): number {
    return (this.pageIndex - 1) * this.pageSize;
  }

  get limit(): number {
    return this.pageSize;
  }
}
