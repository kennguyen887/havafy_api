import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from 'src/global/entities/task.entity';
import {
  CreateTaskReqDto,
  GetTaskListResponseDto,
  GetTaskListQueryDto,
  GetTaskListItemDto,
} from './dto';
import { MediaService } from '../media/media.service';
import { plainToInstance } from 'class-transformer';
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

  async getList(query: GetTaskListQueryDto): Promise<GetTaskListResponseDto> {
    const { workplaceTypes, jobTypes, offset, limit, pageIndex, pageSize } =
      query;
    const [items, total] = await this.taskRepository.findAndCount({
      select: {
        title: true,
        description: true,
        status: true,
        id: true,
        attributes: true,
        createdAt: true,
      },
      where: {},
      order: {
        createdAt: 'DESC',
      },
      skip: offset,
      take: limit,
      cache: true,
    });

    return {
      total,
      pageIndex,
      pageSize,
      data: items.map((item: TaskEntity) =>
        plainToInstance(GetTaskListItemDto, item),
      ),
    };
  }
}
