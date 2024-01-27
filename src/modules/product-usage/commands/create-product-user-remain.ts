import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateProductUserRemainRequestDto } from '../dto';
import { ProductUsageService } from '../product-usage.service';

export class CreateProductUserRemainCommand {
  constructor(public readonly data: CreateProductUserRemainRequestDto) {}
}

@CommandHandler(CreateProductUserRemainCommand)
export class CreateProductUserRemainCommandHandler
  implements ICommandHandler<CreateProductUserRemainCommand>
{
  constructor(private readonly productUsageService: ProductUsageService) {}

  async execute(command: CreateProductUserRemainCommand): Promise<void> {
    const { data } = command;

    return this.productUsageService.createProductUserRemain(data);
  }
}
