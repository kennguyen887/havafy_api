import { IsString, IsNotEmpty, IsInt, MaxLength } from 'class-validator';

export class ProductUserRemainItemRequestDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  sku!: string;

  @IsNotEmpty()
  @IsInt()
  quantity!: number;
}
