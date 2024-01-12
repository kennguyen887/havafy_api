import { HttpStatus, HttpException } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { ConfigService } from '@nestjs/config';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../../global/entities/user.entity';
import { ResetPasswordRequestDto } from '../dto';
import { MailService } from '../../../global/services/mail/mail.service';
import { GCloud } from '../../../services/app-config/configuration';
import { generateRandomString } from '../../../global/utils';
import { CaptchaService } from '../../../global/services/mail/captcha.service';

import { HtmlTemplateService } from '../../html-templates/html-template.service';

export class SendResetPasswordTokenCommand {
  constructor(public readonly data: ResetPasswordRequestDto) {}
}

@CommandHandler(SendResetPasswordTokenCommand)
export class SendResetPasswordTokenCommandHandler
  implements ICommandHandler<SendResetPasswordTokenCommand>
{
  private readonly gcloud: GCloud;

  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private readonly mailService: MailService,
    private readonly captchaService: CaptchaService,
    private readonly configService: ConfigService,
    private readonly htmlTemplateService: HtmlTemplateService,
  ) {
    this.gcloud = this.configService.get<GCloud>('gcloud') as GCloud;
  }

  async execute(command: SendResetPasswordTokenCommand): Promise<void> {
    const {
      data: { email, token },
    } = command;

    const response = await this.captchaService.verifyRecaptcha(token);

    if (!response.data.success && response.data.score < 0.5) {
      throw new HttpException('Token is invalid.', HttpStatus.UNAUTHORIZED);
    }

    const user = await this.usersRepository.findOne({
      where: {
        active: true,
        email,
      },
    });

    if (!user || !user.active) {
      throw new HttpException(
        'Your account is not found or active.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const passwordResetToken = generateRandomString(25, false);

    await this.sendEmail({
      email,
      passwordResetToken,
      fullName: `${user.firstName} ${user.lastName}`,
    });

    await this.usersRepository.save({
      ...user,
      passwordResetToken,
      passwordResetExpired: dayjs().add(1, 'day').toDate(),
    });
  }

  private async sendEmail({
    email,
    passwordResetToken,
    fullName,
  }: {
    email: string;
    passwordResetToken: string;
    fullName: string;
  }): Promise<void> {
    const storefrontBaseUrl = this.configService.get(
      'storefrontBaseUrl',
    ) as string;
    const { subject, html } = await this.htmlTemplateService.render(
      'email/reset-user-password',
      {
        data: {
          resetPasswordLink: `${storefrontBaseUrl}/user/changePassword/${passwordResetToken}`,
          fullName,
        },
      },
    );
    if (!subject || !html) {
      return;
    }

    try {
      const mailResult = await this.mailService.send({
        to: email,
        subject,
        html,
      });
      console.log('Sent an reset password email success', {
        email,
        mailResult,
      });
    } catch (error) {
      throw new HttpException(
        'The email token cannot be sent.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
