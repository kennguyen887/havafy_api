import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ItemService } from '../item.service';

export class DeleteItemCommand {
  constructor(public readonly userId: string, public readonly itemId: string) {}
}

@CommandHandler(DeleteItemCommand)
export class DeleteItemCommandHandler
  implements ICommandHandler<DeleteItemCommand>
{
  constructor(private readonly itemService: ItemService) {}

  async execute(command: DeleteItemCommand): Promise<void> {
    const { itemId, userId } = command;

    return this.itemService.deleteItem(userId, itemId);
  }
}
