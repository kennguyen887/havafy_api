import { ProductEntity } from '../product.entity';
import { ProductStatus, ProductType, ProductAttribute } from '../../models';
import { mockUserEntity } from './user-entity.fixture';
import * as dayjs from 'dayjs';
import { v4 as uuidV4 } from 'uuid';

export const mockProductEntity: ProductEntity = {
  id: uuidV4(),
  active: true,
  userId: uuidV4(),
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
