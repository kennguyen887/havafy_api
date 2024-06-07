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
import { ProfileType, ProfileAttributes } from 'src/global/models';

export class CreateProfileReqDto {
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
  @IsEnum(ProfileType)
  type!: ProfileType;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => ProfileAttributes)
  attributies?: ProfileAttributes;

  @IsString()
  @IsNotEmpty()
  token!: string;
}
