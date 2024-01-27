import {
  IsEnum,
  IsString,
  IsNotEmpty,
  IsInt,
  MaxLength,
} from 'class-validator';
import { ProductUsageType } from 'src/global/models';

export class CreateProductUserUsageRequestDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  productSku!: string;

  @IsNotEmpty()
  @IsInt()
  usageAmount!: number;

  @IsNotEmpty()
  @IsEnum(ProductUsageType)
  productUsageType!: ProductUsageType;

  @IsNotEmpty()
  @IsString()
  userId!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(1000)
  payloadRequest!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  outputResult!: string;
}
