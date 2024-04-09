import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { CommentEntity, TaskEntity } from 'src/global/entities';
import { ConfigModule } from '@nestjs/config';
import { QueryHandlers } from './queries';
import { CommandHandlers } from './commands';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentEntity, TaskEntity]),
    ConfigModule,
    CqrsModule,
  ],
  controllers: [CommentController],
  providers: [CommentService, ...QueryHandlers, ...CommandHandlers],
  exports: [CommentService],
})
export class CommentModule {}
