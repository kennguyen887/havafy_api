import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from 'src/global/entities/comment.entity';
import { CreateCommentReqDto } from './dto';
import { CommentStatus, CommentCurrency } from 'src/global/models';
@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
  ) {}

  async createComment(userId: string, data: CreateCommentReqDto): Promise<void> {
    const { currency = CommentCurrency.VND } = data;
    await this.commentRepository.save({
      ...data,
      status: CommentStatus.FOR_REVIEW,
      currency,
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
