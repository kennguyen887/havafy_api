import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateItemReqDto } from '../dto';
import { ItemService } from '../item.service';
import { Nullable } from 'src/global/utils/types';

export class CreateItemCommand {
  constructor(
    public readonly userId: Nullable<string>,
    public readonly data: CreateItemReqDto,
  ) {}
}

@CommandHandler(CreateItemCommand)
export class CreateItemCommandHandler
  implements ICommandHandler<CreateItemCommand>
{
  constructor(private readonly itemService: ItemService) {}

  async execute(command: CreateItemCommand): Promise<void> {
    const { data, userId } = command;

    return this.itemService.createItem(userId, data);
  }
}
