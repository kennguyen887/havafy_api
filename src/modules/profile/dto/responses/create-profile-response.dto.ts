import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CreateProfileResponseDto {
  @Expose()
  id!: string;
}
