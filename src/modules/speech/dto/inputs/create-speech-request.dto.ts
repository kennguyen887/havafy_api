import {
  IsNotEmpty,
  MinLength,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateSpeechRequestDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(10000)
  text!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(50)
  voice!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(20)
  @MaxLength(5000)
  token!: string;

  @IsOptional()
  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
    maxDecimalPlaces: 5,
  })
  speed?: number;
}
