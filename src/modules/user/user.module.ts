import { Module, forwardRef } from '@nestjs/common';
import { UserController } from './user.controller';
import { AuthService } from './services/auth/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { UserEntity } from '../../global/entities/user.entity';
import { UserService } from './services/user/user.service';
import { PasswordService } from './services/password/password.service';
import { JwtService } from './services/jwt/jwt.service';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './services/auth/strategies/jwt/jwt.strategy';
// import { AppCacheModule } from '../../app-cache/app-cache.module';
import { ProductUsageModule } from '../product-usage/product-usage.module';
import { CommandHandlers } from './commands';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    forwardRef(() => ProductUsageModule),
    ConfigModule,
    // AppCacheModule,
    CqrsModule,
  ],
  controllers: [UserController],
  exports: [AuthService, UserService, PasswordService, JwtService, JwtStrategy],
  providers: [
    AuthService,
    UserService,
    PasswordService,
    JwtService,
    JwtStrategy,
    ...CommandHandlers,
  ],
})
export class UserModule {}
