import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity, TaskEntity } from 'src/global/entities';
import { CreateCommentReqDto } from './dto';
import { CommentStatus, FeatureType } from 'src/global/models';

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
}
