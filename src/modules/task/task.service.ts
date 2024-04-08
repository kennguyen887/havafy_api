import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from 'src/global/entities/task.entity';
import { TaskStatus } from 'src/global/models';
import { CreateTaskReqDto } from './dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
  ) {}

  async createTask(userId: string, data: CreateTaskReqDto): Promise<void> {
    await this.taskRepository.save({
      ...data,
      userId,
    });
  }
}
