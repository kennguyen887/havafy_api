import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateMediaDto } from '../dto';
import { MediaService } from '../media.service';

export class CreateMediaCommand {
  constructor(public readonly data: CreateMediaDto) {}
}

@CommandHandler(CreateMediaCommand)
export class CreateMediaCommandHandler
  implements ICommandHandler<CreateMediaCommand>
{
  constructor(private readonly commentService: MediaService) {}

  async execute(command: CreateMediaCommand): Promise<void> {
    const { data } = command;

    return this.commentService.createMedia(data);
  }
}
