import { IsNotEmpty, IsEmail } from 'class-validator';

export class ResetPasswordRequestDto {
  @IsNotEmpty()
  @IsEmail()
  email!: string;
}
