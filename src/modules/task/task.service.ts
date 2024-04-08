import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from 'src/global/entities/task.entity';
import { CreateTaskReqDto } from './dto';
import { TaskStatus, TaskCurrency } from 'src/global/models';
@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
  ) {}

  async createTask(userId: string, data: CreateTaskReqDto): Promise<void> {
    const { currency = TaskCurrency.VND } = data;
    await this.taskRepository.save({
      ...data,
      status: TaskStatus.FOR_REVIEW,
      currency,
      userId,
    });
  }
}
