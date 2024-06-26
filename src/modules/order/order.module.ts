import { Module, forwardRef } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandHandlers } from './commands';
import { OrderEntity, OrderItemEntity } from 'src/global/entities';
import { PaypalService } from 'src/global/services/mail/paypal.service';
import { ProductModule } from '../product/product.module';
import { ProductUsageModule } from '../product-usage/product-usage.module';
import { QueryHandlers } from './queries';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, OrderItemEntity]),
    forwardRef(() => ProductModule),
    forwardRef(() => ProductUsageModule),
    ConfigModule,
    CqrsModule,
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    PaypalService,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class OrderModule {}
