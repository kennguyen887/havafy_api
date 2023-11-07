import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { ReCaptcha } from '../../../services/app-config/configuration';
import { CreateUserDto } from '../../dto/create-user.dto';
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

  async getUserByToken(token: string): Promise<UserEntity | null> {
    const payload = this.jwtService.getPayload(token) as { id: number };

    if (!payload) {
      throw new HttpException('Token is invalid.', HttpStatus.UNAUTHORIZED);
    }

    const user = await this.userService.getUserById(payload.id);

    if (!user) {
      throw new HttpException('User is not found', HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  async register(userDto: CreateUserDto): Promise<UserEntity> {
    const response = await this.verifyRecaptcha(userDto.token);

    if (!response.data.success && response.data.score < 0.5) {
      throw new HttpException('Token is invalid.', HttpStatus.UNAUTHORIZED);
    }
    // check if user exists and send custom error message
    if (await this.userService.isUserExists(userDto.email)) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    return await this.userService.createUser(userDto);
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
