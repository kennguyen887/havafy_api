import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from 'src/global/entities/task.entity';
import { CreateTaskReqDto } from './dto';
import { MediaService } from '../media/media.service';
import { TaskStatus, TaskCurrency, FeatureType } from 'src/global/models';
@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
    private readonly mediaService: MediaService,
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

  async deleteTask(userId: string, taskId: string): Promise<void> {
    await this.taskRepository.delete({
      id: taskId,
      userId,
    });
    await this.mediaService.deleteMedia({
      userId,
      featureId: taskId,
      featureType: FeatureType.TASK,
    });
  }
}
