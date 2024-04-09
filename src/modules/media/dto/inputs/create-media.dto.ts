import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  MinLength,
} from 'class-validator';
import { FeatureType } from 'src/global/models/feature';

export class CreateMediaReqDto {
  @IsNotEmpty()
  @IsEnum(FeatureType)
  featureType!: FeatureType;

  @IsNotEmpty()
  @IsString()
  featureId!: string;
}

export class CreateMediaDto extends CreateMediaReqDto {
  @IsOptional()
  @IsString()
  @MinLength(10)
  title?: string;

  @IsNotEmpty()
  @IsString()
  fileName!: string;

  @IsNotEmpty()
  @IsString()
  userId!: string;

  @IsNotEmpty()
  @IsString()
  content!: string;
}
