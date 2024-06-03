import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { UpdateItemReqDto, CreateItemResponseDto } from '../dto';
import { ItemService } from '../item.service';

export class UpdateItemCommand {
  constructor(
    public readonly id: string,
    public readonly data: UpdateItemReqDto,
  ) {}
}

@CommandHandler(UpdateItemCommand)
export class UpdateItemCommandHandler
  implements ICommandHandler<UpdateItemCommand>
{
  constructor(private readonly itemService: ItemService) {}

  async execute(command: UpdateItemCommand): Promise<CreateItemResponseDto> {
    const { id, data } = command;

    return this.itemService.updateItem(id, data);
  }
}
