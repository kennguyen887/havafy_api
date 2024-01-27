import { IsString, IsNotEmpty, IsInt, MaxLength } from 'class-validator';

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
  @IsString()
  @MaxLength(1000)
  payloadRequest!: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  outputResult!: string;
}
