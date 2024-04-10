import {
  MaxLength,
  IsString,
  IsArray,
  IsNotEmpty,
  IsEnum,
} from 'class-validator';
import { FeatureType } from 'src/global/models';
import { Transform } from 'class-transformer';
import { BaseQueryDto } from 'src/global/models';

export class GetMediaListQueryDto extends BaseQueryDto {
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @MaxLength(36, { each: true })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.split(',') : value || [],
  )
  featureIds?: string[];

  @IsNotEmpty()
  @IsEnum(FeatureType)
  featureType!: FeatureType;
}
