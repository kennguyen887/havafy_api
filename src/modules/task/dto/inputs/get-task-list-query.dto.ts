import { MaxLength, IsString, IsArray, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { BaseQueryDto } from 'src/global/models';

export class GetTaskListQueryDto extends BaseQueryDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MaxLength(32, { each: true })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.split(',') : value || [],
  )
  tags?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MaxLength(32, { each: true })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.split(',') : value || [],
  )
  skills?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MaxLength(32, { each: true })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.split(',') : value || [],
  )
  locations?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MaxLength(32, { each: true })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.split(',') : value || [],
  )
  workplaceTypes?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MaxLength(32, { each: true })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.split(',') : value || [],
  )
  jobTypes?: string[];
}
