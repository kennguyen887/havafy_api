import { Exclude, Expose } from 'class-transformer';

export class UserPayloadDto {
  @Expose()
  email!: string;

  @Expose()
  id!: string;
}

@Exclude()
export class GetJwtUserPayloadDto {
  @Expose()
  user!: UserPayloadDto;
}
