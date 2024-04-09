import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetCommentListResponseDto, GetCommentListQueryDto } from '../dto';
import { CommentService } from '../comment.service';

export class GetCommentListQuery {
  constructor(public readonly parameters: GetCommentListQueryDto) {}
}

@QueryHandler(GetCommentListQuery)
export class GetCommentListQueryHandler
  implements IQueryHandler<GetCommentListQuery>
{
  constructor(private readonly productService: CommentService) {}

  async execute(
    query: GetCommentListQuery,
  ): Promise<GetCommentListResponseDto> {
    const { parameters } = query;
    return plainToInstance(GetCommentListResponseDto, parameters);
  }
}
