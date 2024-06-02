import { Module, forwardRef } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { ItemEntity } from 'src/global/entities';
import { ConfigModule } from '@nestjs/config';
import { QueryHandlers } from './queries';
import { CommandHandlers } from './commands';
import { ProductModule } from '../product/product.module';
import { MediaModule } from '../media/media.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ItemEntity]),
    forwardRef(() => ProductModule),
    forwardRef(() => MediaModule),
    ConfigModule,
    CqrsModule,
  ],
  controllers: [ItemController],
  providers: [ItemService, ...QueryHandlers, ...CommandHandlers],
  exports: [ItemService],
})
export class ItemModule {}
