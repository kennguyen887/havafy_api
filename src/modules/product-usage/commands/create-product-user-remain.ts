import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ProductUserRemainItemRequestDto } from '../dto';
import { ProductUsageService } from '../product-usage.service';

export class CreateProductUserRemainCommand {
  constructor(
    public readonly userId: string,
    public readonly items: ProductUserRemainItemRequestDto[],
  ) {}
}

@CommandHandler(CreateProductUserRemainCommand)
export class CreateProductUserRemainCommandHandler
  implements ICommandHandler<CreateProductUserRemainCommand>
{
  constructor(private readonly productUsageService: ProductUsageService) {}

  async execute(command: CreateProductUserRemainCommand): Promise<void> {
    const { items, userId } = command;
    await Promise.all(
      items.map((item) => {
        return this.productUsageService.createProductUserRemain(userId, item);
      }),
    );
  }
}
