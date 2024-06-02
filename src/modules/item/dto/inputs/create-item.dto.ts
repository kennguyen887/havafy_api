import {
  IsString,
  MaxLength,
  IsEnum,
  IsOptional,
  MinLength,
  IsNotEmpty,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ItemType, ItemAttributes } from 'src/global/models';

export class CreateItemReqDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(300)
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(3000)
  description?: string;

  @IsNotEmpty()
  @IsEnum(ItemType)
  type!: ItemType;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => ItemAttributes)
  attributies?: ItemAttributes;

  @IsString()
  @IsNotEmpty()
  token!: string;
}
