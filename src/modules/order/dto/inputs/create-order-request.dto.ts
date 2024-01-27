import {
  IsNotEmpty,
  MinLength,
  IsEnum,
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
import { PaymentMethod } from 'src/global/models';

export class CreateOrderItemsDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  productSku!: string;

  @IsNotEmpty()
  @IsNumber()
  quantity!: number;
}

export class CreateOrderRequestDto {
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(30)
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemsDto)
  items!: CreateOrderItemsDto[];

  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  paymentOrderId?: string;

  @IsOptional()
  @IsEnum(PaymentMethod)
  paymentMethod?: PaymentMethod;

  @IsOptional()
  @MinLength(3)
  @MaxLength(100)
  @IsString()
  promoCode?: string;
}
