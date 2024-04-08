import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsEnum,
  IsISO8601,
  IsOptional,
  MinLength,
} from 'class-validator';
import { DoneType, TaskCurrency } from 'src/global/models';

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

  @IsNotEmpty()
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
  @IsEnum(DoneType)
  currency?: TaskCurrency;
}
