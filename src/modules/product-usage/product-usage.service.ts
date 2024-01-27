import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductUserRemainEntity } from 'src/global/entities/product-user-remain.entity';
import { CreateProductUserUsageRequestDto } from './dto';
import { ProductService } from 'src/modules/product/product.service';

@Injectable()
export class ProductUsageService {
  constructor(
    @InjectRepository(ProductUserRemainEntity)
    private productUserRemainEntity: Repository<ProductUserRemainEntity>,
    private readonly productService: ProductService,
  ) {}

  async createProductUserUsage(
    data: CreateProductUserUsageRequestDto,
  ): Promise<void> {
    // const products = await this.productService.getProducts([
    //   ...new Set(items.map((item) => item.productSku)),
    // ]);
  }
}
