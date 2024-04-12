import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { MediaService } from '../media.service';

export class DeleteMediaCommand {
  constructor(
    public readonly userId: string,
    public readonly mediaId: string,
  ) {}
}

@CommandHandler(DeleteMediaCommand)
export class DeleteMediaCommandHandler
  implements ICommandHandler<DeleteMediaCommand>
{
  constructor(private readonly mediaService: MediaService) {}

  async execute(command: DeleteMediaCommand): Promise<void> {
    const { mediaId, userId } = command;

    return this.mediaService.deleteMedia({ userId, mediaId });
  }
}
