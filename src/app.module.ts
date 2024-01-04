import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';
import { getConfig } from './services/app-config/configuration';
// import { AppCacheModule } from './app-cache/app-cache.module';
import { LoggerModule } from './logger/logger.module';
import { AsyncStorageMiddleware } from './global/middleware/async-storage/async-storage.middleware';
import { GlobalModule } from './global/global.module';
import { HtmlTemplateModule } from './modules/html-templates';
@Module({
  imports: [
    GlobalModule,
    ConfigModule.forRoot({
      cache: true,
      load: [getConfig],
    }),
    HtmlTemplateModule.register({
      root: __dirname,
      templateDir: '../templates',
    }),
    DbModule,
    // AppCacheModule,
    UserModule,
    ProductModule,
    ConfigModule,
    LoggerModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AsyncStorageMiddleware).forRoutes('*');
  }
}
