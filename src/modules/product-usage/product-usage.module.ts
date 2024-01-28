import { Module, forwardRef } from '@nestjs/common';
import { ProductUsageController } from './product-usage.controller';
import { ProductUsageService } from './product-usage.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductUserUsageEntity } from 'src/global/entities/product-user-usage.entity';
import { ProductUserRemainEntity } from 'src/global/entities/product-user-remain.entity';
import { ProductModule } from '../product/product.module';
import { ConfigModule } from '@nestjs/config';
import { QueryHandlers } from './queries';
import { CommandHandlers } from './commands';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductUserUsageEntity, ProductUserRemainEntity]),
    forwardRef(() => ProductModule),
    ConfigModule,
    CqrsModule,
  ],
  controllers: [ProductUsageController],
  providers: [ProductUsageService, ...QueryHandlers, ...CommandHandlers],
  exports: [ProductUsageService],
})
export class ProductUsageModule {}
