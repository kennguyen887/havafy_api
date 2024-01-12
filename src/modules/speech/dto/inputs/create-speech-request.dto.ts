import {
  IsNotEmpty,
  MinLength,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  IsEnum,
} from 'class-validator';

import { SsmlVoiceGender } from '../../../../global/models';

export class CreateSpeechRequestDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(2000)
  text?: string;

  @IsOptional()
  @IsInt()
  speed!: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(200)
  voice!: string;

  @IsNotEmpty()
  @IsEnum(SsmlVoiceGender)
  ssmlGender!: SsmlVoiceGender;
}
