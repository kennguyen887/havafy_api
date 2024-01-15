import { UserEntity } from '../user.entity';
import * as dayjs from 'dayjs';
// import { mockProductEntity } from './product-entity.fixture';
import { v4 as uuidV4 } from 'uuid';

export const mockUserEntity: UserEntity = {
  id: uuidV4(),
  email: 'email@gmail.com',
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
  orders: [],
  createdAt: dayjs().toDate(),
  updatedAt: dayjs().toDate(),
};
