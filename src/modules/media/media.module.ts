import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { MediaEntity, TaskEntity } from 'src/global/entities';
import { ConfigModule } from '@nestjs/config';
import { QueryHandlers } from './queries';

@Module({
  imports: [
    TypeOrmModule.forFeature([MediaEntity, TaskEntity]),
    ConfigModule,
    CqrsModule,
  ],
  controllers: [MediaController],
  providers: [MediaService, ...QueryHandlers],
  exports: [MediaService],
})
export class MediaModule {}
