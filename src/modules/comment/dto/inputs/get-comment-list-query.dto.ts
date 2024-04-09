import { MaxLength, IsString, IsArray, IsOptional } from 'class-validator';

import { Transform } from 'class-transformer';

export class GetCommentListQueryDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MaxLength(32, { each: true })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.split(',') : value || [],
  )
  ids?: string[];
}
