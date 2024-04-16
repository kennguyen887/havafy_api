import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsEnum,
  IsISO8601,
  IsOptional,
  MinLength,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { DoneType, TaskCurrency, TaskAttributes } from 'src/global/models';

export class CreateTaskReqDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(30)
  title!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(50)
  description!: string;

  @IsNotEmpty()
  @IsInt()
  budget!: number;

  @IsOptional()
  @IsString()
  location!: string;

  @IsNotEmpty()
  @IsEnum(DoneType)
  doneType!: DoneType;

  @IsOptional()
  @IsISO8601({ strict: true })
  doneAt?: string;

  @IsOptional()
  @IsISO8601({ strict: true })
  publishedAt?: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => TaskAttributes)
  attributies?: TaskAttributes;

  @IsOptional()
  @IsEnum(DoneType)
  currency?: TaskCurrency;
}
