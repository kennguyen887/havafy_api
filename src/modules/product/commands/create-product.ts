import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateProductReqDto } from '../dto';
import { ProductService } from '../product.service';

export class CreateProductCommand {
  constructor(
    public readonly userId: string,
    public readonly data: CreateProductReqDto,
  ) {}
}

@CommandHandler(CreateProductCommand)
export class CreateProductCommandHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(private readonly productService: ProductService) {}

  async execute(command: CreateProductCommand): Promise<void> {
    const { data, userId } = command;

    return this.productService.createProduct(userId, data);
  }
}
