import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CreateItemResponseDto {
  @Expose()
  id!: string;
}
