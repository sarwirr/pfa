import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './entities/order.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {
  Distributor,
  DistributorSchema,
} from 'src/distributor/entities/distributor.entity';
import {
  Pharmacy,
  PharmacySchema,
} from 'src/pharmacy/entities/pharmacy.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Distributor.name, schema: DistributorSchema },
      { name: Pharmacy.name, schema: PharmacySchema },
    ]),
  ],
  providers: [OrderService, EventEmitter2],
  controllers: [OrderController],
})
export class OrderModule {}
