import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { ReCaptcha } from '../../../../services/app-config/configuration';
import { UserService } from '../user/user.service';
import { LoginDto } from '../../dto/login.dto';
import { UserEntity } from '../../entities/user.entity';
import { JwtService } from '../jwt/jwt.service';

@Injectable()
export class AuthService {
  private readonly recaptcha: ReCaptcha;
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.recaptcha = this.configService.get<ReCaptcha>(
      'recaptcha',
    ) as ReCaptcha;
  }

  async getUserById(id: number): Promise<UserEntity | null> {
    return this.userService.getUserById(id);
  }

  async verifyRecaptcha(token: string) {
    const secretKey = this.recaptcha.secret_key;

    const verificationUrl =
      'https://www.google.com/recaptcha/api/siteverify?secret=' +
      secretKey +
      '&response=' +
      token;

    return await axios.post(verificationUrl);
  }

  async login(loginRequest: LoginDto): Promise<string | void> {
    const { email, password } = loginRequest;
    const user = await this.userService.isUserExists(email);

    if (!user) {
      return this.failLogin();
    }

    if (await this.userService.checkUserPassword(user, password)) {
      const token = this.userService.getUserToken(user);
      user.token = token;
      await this.userService.updateUser(user);

      return token;
    }

    this.failLogin('Incorrect password');
  }

  private failLogin(message = 'Login failed') {
    throw new HttpException(message, HttpStatus.BAD_REQUEST);
  }
}
