import {
  IsNotEmpty,
  IsEmail,
  IsString,
  MaxLength,
  IsOptional,
} from 'class-validator';

export class CreateUserByGoogleAccountRequestDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(2000)
  credential!: string;

  @IsOptional()
  @IsEmail()
  clientId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  selectBy!: string;
}
