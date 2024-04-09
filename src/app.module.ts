import { MiddlewareConsumer, Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { BullModuleOptions } from '@nestjs/bull';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { OrderModule } from './modules/order/order.module';
import { SpeechModule } from './modules/speech/speech.module';
import { DbModule } from './db/db.module';
import { getConfig } from './services/app-config/configuration';
// import { AppCacheModule } from './app-cache/app-cache.module';
import { LoggerModule } from './logger/logger.module';
import { AsyncStorageMiddleware } from './global/middleware/async-storage/async-storage.middleware';
import { GlobalModule } from './global/global.module';
import { HtmlTemplateModule } from './modules/html-templates';
import { JobQueueModule } from './modules/job-queue/job-queue.module';
import { PaymentModule } from './modules/payment/payment.module';
import { ProductUsageModule } from './modules/product-usage/product-usage.module';
import { TaskModule } from './modules/task/task.module';
import { CommentModule } from './modules/comment/comment.module';

@Module({
  imports: [
    GlobalModule,
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [getConfig],
    }),
    HtmlTemplateModule.register({
      root: __dirname,
      templateDir: '../templates',
    }),
    BullModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const config = configService.get<BullModuleOptions>(
          'bull',
        ) as BullModuleOptions;
        if (!config) {
          throw new Error('Cannot start app without Bull config');
        }
        return config;
      },
      inject: [ConfigService],
    }),
    DbModule,
    ProductUsageModule,
    // AppCacheModule,
    UserModule,
    SpeechModule,
    ProductModule,
    ConfigModule,
    LoggerModule,
    JobQueueModule,
    PaymentModule,
    OrderModule,
    TaskModule,
    CommentModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AsyncStorageMiddleware).forRoutes('*');
  }
}
