import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'users',
})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  active: boolean;

  @Column({
    name: 'first_name',
  })
  firstName: string;

  @Column({
    name: 'last_name',
  })
  lastName: string;

  @Column()
  email: string;

  @Column({
    name: 'email_verified',
  })
  emailVerified: boolean;

  @Column({
    name: 'password_reset_token',
  })
  passwordResetToken: string;

  @Column({
    name: 'password_reset_expired',
    nullable: true,
  })
  passwordResetExpired: Date | null;

  @Column()
  locale: string;

  @Column({
    name: 'password',
  })
  passwordHash: string;

  @Column()
  token: string;

  @Column()
  avatar?: string;

  @Column({
    name: 'google_id',
  })
  googleId?: string;
}
