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

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(100)
  paymentOrderId!: string;

  @IsNotEmpty()
  @IsEnum(PaymentMethod)
  paymentMethod!: PaymentMethod;
}
