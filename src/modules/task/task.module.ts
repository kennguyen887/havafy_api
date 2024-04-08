import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { TaskEntity } from 'src/global/entities/task.entity';
import { ConfigModule } from '@nestjs/config';
import { QueryHandlers } from './queries';
import { CommandHandlers } from './commands';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity]), ConfigModule, CqrsModule],
  controllers: [TaskController],
  providers: [TaskService, ...QueryHandlers, ...CommandHandlers],
  exports: [TaskService],
})
export class TaskModule {}
