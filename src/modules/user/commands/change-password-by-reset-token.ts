import { HttpStatus, HttpException } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { ConfigService } from '@nestjs/config';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../../global/entities/user.entity';
import { ChangePasswordByResetTokenRequestDto } from '../dto';
import { PasswordService } from '../services/password/password.service';
import { MailService } from '../../../global/services/mail/mail.service';
import { GCloud } from '../../../services/app-config/configuration';

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

    /* try {
      const osClient = OneSignal.createConfiguration({
        appKey: process.env['ONESIGNAL_REST_API_KEY'],
        userKey: process.env['ONESIGNAL_AUTH_KEY'],
      });

      const email = new OneSignal.Notification();
      email.email_subject = 'flags.subject';
      email.email_body = 'flags.body';
      email.email_from_address = 'contact@havafy.com';
      email.include_email_tokens = ['ntnpro@gmail.com'];

      const result = await osClient.createNotification(email);
      console.log('-----------result:', result);
    } catch (error) {
      console.log('Unable to send email.', (error as Error).message);
    }
    */

    const user = await this.usersRepository.findOne({
      where: {
        active: true,
        passwordResetToken: resetToken,
      },
    });

    if (!user || !user.active) {
      throw new HttpException(
        'Your account is not found or active.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (
      user.passwordResetExpired &&
      dayjs().isAfter(dayjs(user.passwordResetExpired))
    ) {
      throw new HttpException('Token expired.', HttpStatus.BAD_REQUEST);
    }

    await this.usersRepository.save({
      ...user,
      passwordHash: await this.passwordService.generate(password),
      passwordResetExpired: null,
      passwordResetToken: null,
    });

    return {
      email: password || '',
    };
  }
}
