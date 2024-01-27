import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductUserRemainEntity } from 'src/global/entities/product-user-remain.entity';
import { ProductUserUsageEntity } from 'src/global/entities/product-user-usage.entity';
import {
  CreateProductUserUsageRequestDto,
  CreateProductUserRemainRequestDto,
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
    data: CreateProductUserRemainRequestDto,
  ): Promise<void> {
    const { sku } = data;

    const products = await this.productService.getProducts([sku]);
    const product = products.find((product) => product.sku === sku);
    const productUsageType = product?.attributes?.productUsageType;

    if (!product || !productUsageType) {
      console.log('Product attribute is not found productUsageType');
      return;
    }

    const remain = await this.productUserRemainRepository
      .createQueryBuilder('remain')
      .andWhere('remain.sku = : sku', { sku })
      .andWhere('remain.userId = :userId ', { userId: data.userId })
      .getOne();

    const remainAmount = new Decimal(remain?.remainAmount || 0)
      .add(data.addRemainAmount)
      .toNumber();

    const productUserRemain = {
      ...remain,
      sku,
      productType: product.productType,
      productUsageType,
      userId: data.userId,
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
      console.log('Product attribute is not found productUsageType');
      return;
    }

    const remain = await this.productUserRemainRepository
      .createQueryBuilder('remain')
      .andWhere('remain.sku = : sku', { sku })
      .andWhere('remain.userId = :userId ', { userId: data.userId })
      .getOne();

    if (!remain || !remain.remainAmount) {
      throw new HttpException(
        'User do not have quota service.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const productUserUsage = {
      ...data,
      productName: product.name,
      sku: product.sku,
      productUsageType,
    };

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
}
