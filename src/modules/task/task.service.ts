import { Injectable } from '@nestjs/common';
import { Repository, In, JsonContains } from 'typeorm';
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
import {
  TaskStatus,
  TaskCurrency,
  FeatureType,
  DoneType,
} from 'src/global/models';
@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
    private readonly mediaService: MediaService,
  ) {}

  async createTask(userId: string, data: CreateTaskReqDto): Promise<void> {
    const { currency = TaskCurrency.VND } = data;
    await this.taskRepository.insert(
      new TaskEntity({
        ...data,
        status: TaskStatus.ACTIVE,
        doneType: DoneType.FLEXIABLE,
        doneAt: null,
        publishedAt: null,
        attributes: data.attributies,
        currency,
        userId,
      }),
    );
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
    const {
      locations,
      workplaceType,
      skills,
      tags,
      jobType,
      offset,
      limit,
      pageIndex,
      pageSize,
    } = query;
    let attributes = null;

    if (jobType) {
      attributes = { jobType };
    }

    if (workplaceType) {
      attributes = { ...attributes, workplaceType };
    }

    if (tags?.length) {
      attributes = { ...attributes, tags };
    }

    if (skills?.length) {
      attributes = { ...attributes, skills };
    }

    const [items, total] = await this.taskRepository.findAndCount({
      select: [
        'id',
        'userId',
        'title',
        'description',
        'createdAt',
        'budget',
        'currency',
        'status',
        'doneAt',
        'doneType',
        'location',
        'attributes',
      ],
      where: {
        status: TaskStatus.ACTIVE,
        location: locations ? In(locations) : undefined,
        attributes: attributes ? JsonContains(attributes) : undefined,
      },
      order: {
        createdAt: 'DESC',
      },
      skip: offset,
      take: limit,
      // cache: true,
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
