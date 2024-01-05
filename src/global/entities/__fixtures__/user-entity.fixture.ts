import { UserEntity } from '../user.entity';
import * as dayjs from 'dayjs';
import { mockProductEntity } from './product-entity.fixture';

export const mockUserEntity: UserEntity = {
  id: 0,
  email: 'email',
  active: true,
  emailVerified: true,
  lastName: 'lName',
  firstName: 'fName',
  token: 'token',
  passwordHash: 'password',
  passwordResetToken: null,
  passwordResetExpired: dayjs().add(1, 'day').toDate(),
  avatar: '',
  locale: 'us',
  googleId: '',
  products: [mockProductEntity],
};
