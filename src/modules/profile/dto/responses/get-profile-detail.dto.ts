import { Exclude, Expose } from 'class-transformer';
import { ProfileAttributes, ProfileStatus } from 'src/global/models';

@Exclude()
export class GetProfileDetailDto {
  @Expose()
  id!: string;

  @Expose()
  userId!: string;

  @Expose()
  title!: string;

  @Expose()
  description!: string;

  @Expose()
  status!: ProfileStatus;

  @Expose()
  attributes!: ProfileAttributes;
}
