import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/global/entities/product.entity';
import { ProductStatus } from 'src/global/models';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}
  async getProducts(skuList: string[]): Promise<ProductEntity[]> {
    return this.productRepository
      .createQueryBuilder('products')
      .andWhere('products.sku IN (:...skuList)', { skuList })
      .andWhere('products.status = :status ', { status: ProductStatus.ACTIVE })
      .andWhere('products.isHidden = :isHidden ', { isHidden: false })
      .getMany();
  }
}
