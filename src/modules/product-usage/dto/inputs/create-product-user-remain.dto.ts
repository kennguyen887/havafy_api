import { IsString, IsNotEmpty, IsInt, MaxLength } from 'class-validator';

export class CreateProductUserRemainRequestDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  sku!: string;

  @IsNotEmpty()
  @IsInt()
  addRemainAmount!: number;

  @IsNotEmpty()
  @IsString()
  userId!: string;
}
