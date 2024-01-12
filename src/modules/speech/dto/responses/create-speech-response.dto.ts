import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CreateSpeechResponsetDto {
  @Expose()
  speechFileUrl!: string;
}
