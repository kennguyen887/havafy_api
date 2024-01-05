import { ProductEntity } from '../product.entity';
import { ProductStatus, ProductType, ProductAttribute } from '../../models';
import { mockUserEntity } from './user-entity.fixture';
import * as dayjs from 'dayjs';

export const mockProductEntity: ProductEntity = {
  id: 0,
  active: true,
  userId: 1,
  name: 'string',
  price: 1,
  basePrice: 1,
  discountPrice: 1,
  status: ProductStatus.ACTIVE,
  productType: ProductType.EVENT,
  description: 'string',
  currency: 'USD',
  publishedAt: dayjs().add(1, 'day').toDate(),
  isHidden: false,
  attributes: new ProductAttribute(),
  user: mockUserEntity,
};
