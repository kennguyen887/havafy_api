import { HttpStatus, HttpException } from '@nestjs/common';
import axios from 'axios';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import {
  CreateUserByGoogleAccountRequestDto,
  LoginByProviderAccountResDto,
} from '../dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserService } from '../services/user/user.service';
import { PasswordService } from '../services/password/password.service';

export class CreateUserByGoogleAccountCommand {
  constructor(public readonly data: CreateUserByGoogleAccountRequestDto) {}
}

@CommandHandler(CreateUserByGoogleAccountCommand)
export class CreateUserByGoogleAccountCommandHandler
  implements ICommandHandler<CreateUserByGoogleAccountCommand>
{
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private readonly passwordService: PasswordService,
    private readonly userService: UserService,
  ) {}

  async execute(
    command: CreateUserByGoogleAccountCommand,
  ): Promise<LoginByProviderAccountResDto> {
    const {
      data: { credential },
    } = command;

    try {
      const { data } = await axios({
        method: 'get',
        url: `https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`,
      });
      const { email, given_name, family_name, email_verified } = data;

      if (email_verified !== 'true') {
        throw new HttpException(
          'Your email is not verified',
          HttpStatus.BAD_REQUEST,
        );
      }

      const existingUser = await this.usersRepository.findOne({
        where: {
          email,
        },
      });

      if (existingUser) {
        const token = this.userService.getUserToken(existingUser);
        return {
          userId: existingUser.id,
          token,
        };
      }
      const user: CreateUserDto = {
        email,
        password: this.generateRandomString(10),
        lastName: given_name,
        firstName: family_name,
      };

      const newUser = await this.userService.createUser(user);

      return {
        userId: newUser.id,
        token: newUser.token,
      };
    } catch (error) {
      console.log('-------------', error);
      throw new HttpException(
        'The Oauth2 token is invalid',
        HttpStatus.BAD_REQUEST,
      );
    }
    /*
    let user = await this.usersRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
    }

    if (email) {
      const existingUser = await this.usersRepository.findOne({
        where: {
          email,
          id: Not(userId),
        },
      });

      if (existingUser) {
        throw new HttpException('Email is existing.', HttpStatus.BAD_REQUEST);
      }

      user.email = email;
    }

    if (firstName) {
      user = {
        ...user,
        firstName,
      };
    }

    if (lastName) {
      user = {
        ...user,
        lastName,
      };
    }

    if (password) {
      user = {
        ...user,
        passwordHash: await this.passwordService.generate(password),
      };
    }

    await this.usersRepository.save(user);
    */
  }
  private generateRandomString(length: number): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.<>?';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters.charAt(randomIndex);
    }

    return result;
  }
}
