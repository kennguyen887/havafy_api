import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Nullable } from '../../shared/utils';

@Entity({
  name: 'users',
})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

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
