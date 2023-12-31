import { HttpStatus, HttpException } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { ConfigService } from '@nestjs/config';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { ChangePasswordByResetTokenRequestDto } from '../dto';
import { PasswordService } from '../services/password/password.service';
import { MailService } from '../../global/services/mail/mail.service';
import { GCloud } from '../../services/app-config/configuration';
import { generateRandomString } from '../../shared/utils';

export class ChangePasswordByResetTokenCommand {
  constructor(public readonly data: ChangePasswordByResetTokenRequestDto) {}
}

@CommandHandler(ChangePasswordByResetTokenCommand)
export class ChangePasswordByResetTokenCommandHandler
  implements ICommandHandler<ChangePasswordByResetTokenCommand>
{
  private readonly gcloud: GCloud;

  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
    private readonly passwordService: PasswordService,
  ) {
    this.gcloud = this.configService.get<GCloud>('gcloud') as GCloud;
  }

  async execute(
    command: ChangePasswordByResetTokenCommand,
  ): Promise<{ email: string }> {
    const {
      data: { resetToken, password },
    } = command;

    const existingUser = await this.usersRepository.findOne({
      where: {
        active: true,
        passwordResetToken: resetToken,
      },
    });

    if (!existingUser || !existingUser.active) {
      throw new HttpException(
        'Your account is not found or active.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const passwordResetToken = generateRandomString(10, false);

    const sendOptions = {
      to: 'ntnpro@gmail.com',
      subject: 'User registered',
      html: `<h1>22222</h1> xin chao! ${passwordResetToken}`,
    };
    const mailResult = await this.mailService.send(sendOptions);
    await this.usersRepository.save({
      ...existingUser,
      passwordHash: await this.passwordService.generate(password),
      passwordResetExpired: null,
    });

    console.log('------------mailResult:', mailResult);

    return {
      email: password || '',
    };
  }
}
