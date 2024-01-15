import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
import { CommandHandlers } from './commands';

@Module({
  imports: [ConfigModule, CqrsModule],
  controllers: [OrderController],
  providers: [OrderService, ...CommandHandlers],
})
export class OrderModule {}
