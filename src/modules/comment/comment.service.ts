import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity, TaskEntity } from 'src/global/entities';
import {
  CreateCommentReqDto,
  GetCommentListQueryDto,
  GetCommentListResponseDto,
  GetCommentResponseDto,
} from './dto';
import { CommentStatus, FeatureType } from 'src/global/models';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
    @InjectRepository(TaskEntity)
    private taskRepository: Repository<TaskEntity>,
  ) {}

  async createComment(
    userId: string,
    data: CreateCommentReqDto,
  ): Promise<void> {
    const { featureType, featureId } = data;
    let feature = null;

    if (featureType === FeatureType.TASK) {
      feature = await this.taskRepository.findOneBy({ id: featureId });
    }

    if (!feature) {
      throw new HttpException('Feature is not found', HttpStatus.BAD_REQUEST);
    }

    await this.commentRepository.save({
      ...data,
      status: CommentStatus.FOR_REVIEW,
      featureId: feature.id,
      userId,
    });
  }

  async deleteComment(userId: string, commentId: string): Promise<void> {
    await this.commentRepository.delete({
      id: commentId,
      userId,
    });
  }
  async getList(
    userId: string,
    query: GetCommentListQueryDto,
  ): Promise<GetCommentListResponseDto> {
    const { featureIds, featureTypes, offset, limit, pageIndex, pageSize } =
      query;
    const [items, total] = await this.commentRepository.findAndCount({
      select: {
        title: true,
        description: true,
        status: true,
        id: true,
        featureId: true,
        featureType: true,
        attributes: true,
        createdAt: true,
      },
      where: { featureId: In(featureIds), featureType: In(featureTypes) },
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
      data: items.map((item: CommentEntity) =>
        plainToInstance(GetCommentResponseDto, item),
      ),
    };
  }
}
