import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductEntity } from 'src/global/entities/product.entity';
import { ConfigModule } from '@nestjs/config';
import { QueryHandlers } from './queries';
import { CommandHandlers } from './commands';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity]),
    ConfigModule,
    CqrsModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, ...QueryHandlers, ...CommandHandlers],
  exports: [ProductService],
})
export class ProductModule {}
