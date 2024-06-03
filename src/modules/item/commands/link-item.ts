import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateItemResponseDto } from '../dto';
import { ItemService } from '../item.service';

export class LinkItemCommand {
  constructor(public readonly id: string, public readonly userId: string) {}
}

@CommandHandler(LinkItemCommand)
export class LinkItemCommandHandler
  implements ICommandHandler<LinkItemCommand>
{
  constructor(private readonly itemService: ItemService) {}

  async execute(command: LinkItemCommand): Promise<CreateItemResponseDto> {
    const { id, userId } = command;

    return this.itemService.linkItem(id, userId);
  }
}
