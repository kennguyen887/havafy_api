import { Module, forwardRef } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { ProfileEntity } from 'src/global/entities';
import { ConfigModule } from '@nestjs/config';
import { QueryHandlers } from './queries';
import { CommandHandlers } from './commands';
import { ProductModule } from '../product/product.module';
import { MediaModule } from '../media/media.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfileEntity]),
    forwardRef(() => ProductModule),
    forwardRef(() => MediaModule),
    ConfigModule,
    CqrsModule,
  ],
  controllers: [ProfileController],
  providers: [ProfileService, ...QueryHandlers, ...CommandHandlers],
  exports: [ProfileService],
})
export class ProfileModule {}
