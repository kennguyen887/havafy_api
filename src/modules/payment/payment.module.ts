import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { CqrsModule } from '@nestjs/cqrs';
import { ConfigModule } from '@nestjs/config';
// import { CommandHandlers } from './commands';

@Module({
  imports: [ConfigModule, CqrsModule],
  controllers: [PaymentController],
  providers: [PaymentService /*...CommandHandlers*/],
})
export class PaymentModule {}
