import {
  MaxLength,
  IsString,
  IsArray,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { BaseQueryDto } from 'src/global/models';
import { ProfileType } from 'src/global/models';

export class GetProfileListQueryDto extends BaseQueryDto {
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
  @IsEnum(ProfileType)
  type?: ProfileType;
}
