import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { MediaEntity, TaskEntity, CommentEntity } from 'src/global/entities';
import { ConfigModule } from '@nestjs/config';
import { QueryHandlers } from './queries';
import { CommandHandlers } from './commands';

@Module({
  imports: [
    TypeOrmModule.forFeature([MediaEntity, TaskEntity, CommentEntity]),
    ConfigModule,
    CqrsModule,
  ],
  controllers: [MediaController],
  providers: [MediaService, ...QueryHandlers, ...CommandHandlers],
  exports: [MediaService],
})
export class MediaModule {}
