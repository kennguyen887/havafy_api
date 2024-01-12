import { Global, Module } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { ASYNC_STORAGE } from './constants';
import { MailService } from './services/mail/mail.service';
import { CaptchaService } from './services/mail/captcha.service';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: ASYNC_STORAGE,
      useValue: new AsyncLocalStorage(),
    },
    MailService,
    CaptchaService,
  ],
  exports: [ASYNC_STORAGE, MailService, CaptchaService],
})
export class GlobalModule {}
