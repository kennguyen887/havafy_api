import { Module, forwardRef } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { TaskEntity } from 'src/global/entities/task.entity';
import { ConfigModule } from '@nestjs/config';
import { QueryHandlers } from './queries';
import { CommandHandlers } from './commands';
import { ProductModule } from '../product/product.module';
import { MediaModule } from '../media/media.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskEntity]),
    forwardRef(() => ProductModule),
    forwardRef(() => MediaModule),
    ConfigModule,
    CqrsModule,
  ],
  controllers: [TaskController],
  providers: [TaskService, ...QueryHandlers, ...CommandHandlers],
  exports: [TaskService],
})
export class TaskModule {}
