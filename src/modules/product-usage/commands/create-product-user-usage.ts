import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateProductUserUsageRequestDto } from '../dto';
import { ProductUsageService } from '../product-usage.service';

export class CreateProductUserUsageCommand {
  constructor(public readonly data: CreateProductUserUsageRequestDto) {}
}

@CommandHandler(CreateProductUserUsageCommand)
export class CreateProductUserUsageCommandHandler
  implements ICommandHandler<CreateProductUserUsageCommand>
{
  constructor(private readonly productUsageService: ProductUsageService) {}

  async execute(command: CreateProductUserUsageCommand): Promise<void> {
    const { data } = command;

    return this.productUsageService.createProductUserUsage(data);
  }
}
