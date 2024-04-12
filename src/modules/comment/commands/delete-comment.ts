import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CommentService } from '../comment.service';

export class DeleteCommentCommand {
  constructor(
    public readonly userId: string,
    public readonly commentId: string,
  ) {}
}

@CommandHandler(DeleteCommentCommand)
export class DeleteCommentCommandHandler
  implements ICommandHandler<DeleteCommentCommand>
{
  constructor(private readonly commentService: CommentService) {}

  async execute(command: DeleteCommentCommand): Promise<void> {
    const { commentId, userId } = command;

    return this.commentService.deleteComment(userId, commentId);
  }
}
