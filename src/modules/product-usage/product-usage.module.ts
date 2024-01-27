import { Module } from '@nestjs/common';
import { ProductUsageController } from './product-usage.controller';
import { ProductUsageService } from './product-usage.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductUserUsageEntity } from 'src/global/entities/product-user-usage.entity';
import { ProductUserRemainEntity } from 'src/global/entities/product-user-remain.entity';
import { ConfigModule } from '@nestjs/config';
import { QueryHandlers } from './queries';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductUserUsageEntity, ProductUserRemainEntity]),
    ConfigModule,
    CqrsModule,
  ],
  controllers: [ProductUsageController],
  providers: [ProductUsageService, ...QueryHandlers],
  exports: [ProductUsageService],
})
export class ProductUsageModule {}
