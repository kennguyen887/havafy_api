import {
  IsNotEmpty,
  MinLength,
  IsString,
  MaxLength,
  IsNumber,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  ValidateNested,
  IsOptional,
} from 'class-validator';

import { Type } from 'class-transformer';

class GetOrderGrandTotalItemsDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  productSku!: string;

  @IsNotEmpty()
  @IsNumber()
  quantity!: number;
}

export class GetOrderGrandTotalRequestDto {
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(30)
  @ValidateNested({ each: true })
  @Type(() => GetOrderGrandTotalItemsDto)
  items!: GetOrderGrandTotalItemsDto[];

  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(100)
  promoCode?: string;
}
