import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class LoginByProviderAccountResDto {
  @Expose()
  token!: string;

  @Expose()
  userId!: number;
}
