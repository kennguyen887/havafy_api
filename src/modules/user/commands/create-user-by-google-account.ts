import { HttpStatus, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import {
  CreateUserByGoogleAccountRequestDto,
  LoginByProviderAccountResDto,
} from '../dto';
import { UserService } from '../services/user/user.service';
import { PasswordService } from '../services/password/password.service';
import { GCloud } from '../../../services/app-config/configuration';

import { OAuth2Client, TokenPayload } from 'google-auth-library';
import { generateRandomString } from '../../../global/utils';

export class CreateUserByGoogleAccountCommand {
  constructor(public readonly data: CreateUserByGoogleAccountRequestDto) {}
}

@CommandHandler(CreateUserByGoogleAccountCommand)
export class CreateUserByGoogleAccountCommandHandler
  implements ICommandHandler<CreateUserByGoogleAccountCommand>
{
  private readonly gcloud: GCloud;

  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private readonly passwordService: PasswordService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    this.gcloud = this.configService.get<GCloud>('gcloud') as GCloud;
  }

  async execute(
    command: CreateUserByGoogleAccountCommand,
  ): Promise<LoginByProviderAccountResDto> {
    const {
      data: { credential },
    } = command;

    let payload: TokenPayload | undefined;
    try {
      const client = new OAuth2Client();
      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: this.gcloud.client_id, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      payload = ticket.getPayload();
    } catch (error) {
      console.log('The Oauth2 token is invalid', error);
      throw new HttpException('Token used too late.', HttpStatus.BAD_REQUEST);
    }
    if (!payload) {
      throw new HttpException('The user is invalid.', HttpStatus.BAD_REQUEST);
    }
    const { email, given_name, family_name, email_verified, sub, picture } =
      payload;

    if (!email_verified || !email) {
      throw new HttpException(
        'Your email is not verified.',
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
    const userPayload = {
      email,
      passwordHash: await this.passwordService.generate(
        generateRandomString(10),
      ),
      lastName: given_name || '',
      firstName: family_name || '',
      googleId: sub,
      avatar: picture,
    };

    let newUser = this.usersRepository.create(userPayload);
    newUser = await this.usersRepository.save(newUser);
    const token = this.userService.getUserToken(newUser);

    return {
      userId: newUser.id,
      token: token,
    };
  }
}
