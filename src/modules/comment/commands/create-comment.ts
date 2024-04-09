import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateCommentReqDto } from '../dto';
import { CommentService } from '../comment.service';

export class CreateCommentCommand {
  constructor(
    public readonly userId: string,
    public readonly data: CreateCommentReqDto,
  ) {}
}

@CommandHandler(CreateCommentCommand)
export class CreateCommentCommandHandler
  implements ICommandHandler<CreateCommentCommand>
{
  constructor(private readonly commentService: CommentService) {}

  async execute(command: CreateCommentCommand): Promise<void> {
    const { data, userId } = command;

    return this.commentService.createComment(userId, data);
  }
}
