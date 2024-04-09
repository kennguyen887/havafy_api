import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  MinLength,
  IsBase64,
} from 'class-validator';
import { FeatureType } from 'src/global/models/feature';

export class CreateMediaReqDto {
  @IsNotEmpty()
  @IsString()
  userId!: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  title?: string;

  @IsNotEmpty()
  @IsBase64()
  content!: string;

  @IsNotEmpty()
  @IsEnum(FeatureType)
  featureType!: FeatureType;

  @IsNotEmpty()
  @IsString()
  featureId!: string;
}
