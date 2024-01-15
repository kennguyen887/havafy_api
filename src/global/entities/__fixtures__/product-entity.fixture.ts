import { ProductEntity } from '../product.entity';
import { ProductStatus, ProductType, ProductAttribute } from '../../models';
import { mockUserEntity } from './user-entity.fixture';
import * as dayjs from 'dayjs';
import { v4 as uuidV4 } from 'uuid';

export const mockProductEntity: ProductEntity = {
  id: uuidV4(),
  userId: uuidV4(), // Replace with a valid user ID
  name: 'Mock Product',
  sku: 'ABC123',
  price: 29.99,
  basePrice: 39.99,
  status: ProductStatus.DRAFT,
  productType: ProductType.MAIN,
  description: 'This is a mock product for testing purposes.',
  currency: 'USD',
  publishedAt: dayjs().subtract(7, 'days').toDate(),
  isHidden: false,
  attributes: {
    color: 'Blue',
    size: 'Large',
    weight: 0.5,
  } as ProductAttribute,
  createdAt: dayjs().toDate(),
  updatedAt: dayjs().toDate(),
  // user: mockUserEntity,
};
