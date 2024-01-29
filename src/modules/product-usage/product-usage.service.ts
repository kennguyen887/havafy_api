import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductUserRemainEntity } from 'src/global/entities/product-user-remain.entity';
import { ProductUserUsageEntity } from 'src/global/entities/product-user-usage.entity';
import {
  CreateProductUserUsageRequestDto,
  ProductUserRemainItemRequestDto,
} from './dto';
import { ProductService } from 'src/modules/product/product.service';
import Decimal from 'decimal.js';

@Injectable()
export class ProductUsageService {
  constructor(
    @InjectRepository(ProductUserRemainEntity)
    private productUserRemainRepository: Repository<ProductUserRemainEntity>,
    @InjectRepository(ProductUserUsageEntity)
    private productUserUsageRepository: Repository<ProductUserUsageEntity>,
    private readonly productService: ProductService,
  ) {}

  async createProductUserRemain(
    userId: string,
    item: ProductUserRemainItemRequestDto,
  ): Promise<void> {
    const { sku, quantity, customRemainAmount } = item;

    const products = await this.productService.getProducts([sku]);
    const product = products.find((product) => product.sku === sku);
    const productUsageType = product?.attributes?.productUsageType;
    let addUsageRemainAmount = product?.attributes?.addUsageRemainAmount || 0;

    if (customRemainAmount) {
      addUsageRemainAmount = customRemainAmount;
    }

    if (!product || !productUsageType) {
      console.log('Product attribute is not found productUsageType');
      return;
    }

    const remain = await this.productUserRemainRepository
      .createQueryBuilder('remain')
      .andWhere('remain.sku = :sku', { sku })
      .andWhere('remain.userId = :userId ', { userId })
      .getOne();

    const remainAmount = new Decimal(remain?.remainAmount || 0)
      .add(addUsageRemainAmount)
      .mul(quantity)
      .toNumber();

    const productUserRemain = {
      ...remain,
      sku,
      productType: product.productType,
      productUsageType,
      userId,
      remainAmount,
    };

    await this.productUserRemainRepository.save(productUserRemain);
  }

  async createProductUserUsage(
    data: CreateProductUserUsageRequestDto,
  ): Promise<void> {
    const { sku } = data;

    const products = await this.productService.getProducts([sku]);
    const product = products.find((product) => product.sku === sku);
    const productUsageType = product?.attributes?.productUsageType;

    if (!product || !productUsageType) {
      throw new HttpException(
        'Product attribute is not found productUsageType',
        HttpStatus.BAD_REQUEST,
      );
    }

    const remain = await this.productUserRemainRepository
      .createQueryBuilder('remain')
      .andWhere('remain.sku = :sku', { sku })
      .andWhere('remain.userId = :userId ', { userId: data.userId })
      .getOne();

    if (!remain || !remain.remainAmount) {
      throw new HttpException(
        'User do not have quota service.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const productUserUsage = new ProductUserUsageEntity({
      ...data,
      productType: product.productType,
      sku: product.sku,
      productUsageType,
    });

    await this.productUserUsageRepository.save(productUserUsage);

    const remainAmount = new Decimal(remain.remainAmount)
      .sub(data.usageAmount)
      .toNumber();

    const productUserRemain = {
      ...remain,
      sku,
      userId: data.userId,
      remainAmount: remainAmount > 0 ? remainAmount : 0,
    };

    await this.productUserRemainRepository.save(productUserRemain);
  }

  async getUserRemains(
    userId: string,
    skuList: string[],
  ): Promise<{ sku: string; remainAmount: number }[]> {
    const remains = await this.productUserRemainRepository
      .createQueryBuilder('remain')
      .andWhere('remain.sku IN (:...skuList)', { skuList })
      .andWhere('remain.userId = :userId ', { userId })
      .getMany();

    return remains?.map((remain) => {
      return {
        sku: remain.sku,
        remainAmount: new Decimal(remain?.remainAmount || 0).toNumber(),
      };
    });
  }
}
