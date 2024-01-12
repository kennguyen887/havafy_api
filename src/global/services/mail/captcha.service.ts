import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { ReCaptcha } from '../../../services/app-config/configuration';

@Injectable()
export class CaptchaService {
  private readonly recaptcha: ReCaptcha;

  constructor(private readonly configService: ConfigService) {
    this.recaptcha = this.configService.get<ReCaptcha>(
      'recaptcha',
    ) as ReCaptcha;
  }

  public async verifyRecaptcha(token: string) {
    const secretKey = this.recaptcha.secret_key;

    const verificationUrl =
      'https://www.google.com/recaptcha/api/siteverify?secret=' +
      secretKey +
      '&response=' +
      token;

    return await axios.post(verificationUrl);
  }
}
