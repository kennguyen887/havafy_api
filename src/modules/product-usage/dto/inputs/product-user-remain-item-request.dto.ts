import {
  IsString,
  IsNotEmpty,
  IsInt,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class ProductUserRemainItemRequestDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  sku!: string;

  @IsNotEmpty()
  @IsInt()
  quantity!: number;

  @IsOptional()
  @IsInt()
  customRemainAmount?: number;
}
