import { UserEntity } from '../user.entity';

export const mockUserEntity: UserEntity = {
  id: 0,
  email: 'email',
  active: true,
  emailVerified: true,
  lastName: 'lName',
  firstName: 'fName',
  token: 'token',
  passwordHash: 'password',
  passwordResetToken: '',
  passwordResetExpired: '',
  avatar: '',
  locale: 'us',
  googleId: '',
};
