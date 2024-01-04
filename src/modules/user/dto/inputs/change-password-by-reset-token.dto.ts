import {
  IsNotEmpty,
  MinLength,
  Validate,
  MaxLength,
  IsString,
} from 'class-validator';
import { IsValidPassword } from '../../../../global/decorators';

export class ChangePasswordByResetTokenRequestDto {
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(100)
  @Validate(IsValidPassword)
  password!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(100)
  resetToken!: string;
}
