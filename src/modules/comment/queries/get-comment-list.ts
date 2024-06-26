import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCommentListResponseDto, GetCommentListQueryDto } from '../dto';
import { CommentService } from '../comment.service';

export class GetCommentListQuery {
  constructor(public readonly parameters: GetCommentListQueryDto) {}
}

@QueryHandler(GetCommentListQuery)
export class GetCommentListQueryHandler
  implements IQueryHandler<GetCommentListQuery>
{
  constructor(private readonly commentService: CommentService) {}

  async execute(
    query: GetCommentListQuery,
  ): Promise<GetCommentListResponseDto> {
    return this.commentService.getList(query.parameters);
  }
}
