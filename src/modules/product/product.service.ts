import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/global/entities/product.entity';
import {
  ProductStatus,
  ProductType,
  ProductUsageType,
} from 'src/global/models';
import { CreateProductReqDto } from './dto';

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

  async createProduct(
    userId: string,
    data: CreateProductReqDto,
  ): Promise<void> {
    if (data.sku === 'TTS-100') {
      await this.productRepository.save({
        name: 'Text to speech service - converts text into spoken audio',
        sku: data.sku,
        userId,
        price: 9.9,
        basePrice: 19,
        productType: ProductType.AI_SERVICE,
        status: ProductStatus.ACTIVE,
        currency: 'USD',
        attributes: {
          productUsageType: ProductUsageType.CHARACTERS,
          addUsageRemainAmount: 1000000, // 1 milions
        },
      });
    }
  }
}
