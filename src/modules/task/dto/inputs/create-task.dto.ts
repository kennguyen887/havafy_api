import { IsString, IsNotEmpty, IsInt } from 'class-validator';
import { DoneType } from 'src/global/models';

export class CreateTaskReqDto {
  @IsNotEmpty()
  @IsString()
  title!: string;

  @IsNotEmpty()
  @IsString()
  description!: string;

  @IsNotEmpty()
  @IsInt()
  budget!: number;

  @IsNotEmpty()
  @IsString()
  location!: string;

  @IsNotEmpty()
  @IsString()
  doneType!: DoneType;
}
