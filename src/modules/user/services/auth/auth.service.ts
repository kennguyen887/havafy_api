import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { LoginDto } from '../../dto/login.dto';
import { UserEntity } from 'src/global/entities/user.entity';
import { JwtService } from '../jwt/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async getUserById(id: string): Promise<UserEntity | null> {
    return this.userService.getUserById(id);
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
