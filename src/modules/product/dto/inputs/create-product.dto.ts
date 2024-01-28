import { IsString, IsNotEmpty } from 'class-validator';

export class CreateProductReqDto {
  @IsNotEmpty()
  @IsString()
  sku!: string;
}
