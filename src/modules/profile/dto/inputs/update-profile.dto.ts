import {
  IsString,
  MaxLength,
  IsOptional,
  MinLength,
  IsUUID,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ProfileAttributes } from 'src/global/models';

export class UpdateProfileReqDto {
  @IsOptional()
  @IsString()
  @IsUUID()
  userId?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(3000)
  description?: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => ProfileAttributes)
  attributies?: ProfileAttributes;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(300)
  title!: string;
}
