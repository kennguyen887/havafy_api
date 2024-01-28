import { IsString, IsNotEmpty, MaxLength, IsArray } from 'class-validator';

import { Transform } from 'class-transformer';

export class GetProductUserRemainQueryDto {
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @MaxLength(10, { each: true })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.split(',') : value || [],
  )
  skuList!: string[];
}
