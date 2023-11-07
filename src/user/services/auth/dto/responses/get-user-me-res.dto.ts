import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GetUserMeResDto {
  @Expose()
  id!: string;

  @Expose()
  email!: string;

  @Expose()
  firstName!: string;

  @Expose()
  lastName!: string;
}
