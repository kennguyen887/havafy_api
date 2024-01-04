import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  Validate,
} from 'class-validator';
import { IsValidPassword } from '../../../global/decorators';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  firstName!: string;

  @IsString()
  @IsOptional()
  lastName!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(100)
  @Validate(IsValidPassword)
  password!: string;

  @IsString()
  @IsOptional()
  googleId?: string;
}

export class CreateUserReqDto extends CreateUserDto {
  @IsString()
  @IsNotEmpty()
  token!: string;
}
