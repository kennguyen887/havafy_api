import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  MinLength,
  MaxLength,
} from 'class-validator';
import { FeatureType } from 'src/global/models/feature';

export class CreateCommentReqDto {
  @IsNotEmpty()
  @IsString()
  userId!: string;

  @IsOptional()
  @IsString()
  @MinLength(30)
  title?: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(50)
  @MaxLength(1000)
  description!: string;

  @IsNotEmpty()
  @IsEnum(FeatureType)
  featureType!: FeatureType;

  @IsNotEmpty()
  @IsString()
  featureId!: string;
}
