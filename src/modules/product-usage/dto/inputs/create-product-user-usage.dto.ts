import {
  IsString,
  IsNotEmpty,
  IsInt,
  MaxLength,
  IsObject,
} from 'class-validator';

export class CreateProductUserUsageRequestDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  sku!: string;

  @IsNotEmpty()
  @IsInt()
  usageAmount!: number;

  @IsNotEmpty()
  @IsString()
  userId!: string;

  @IsNotEmpty()
  @IsObject()
  @MaxLength(10000)
  payloadRequest!: object;

  @IsNotEmpty()
  @IsObject()
  @MaxLength(10000)
  outputResult!: object;
}
