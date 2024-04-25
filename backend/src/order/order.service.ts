import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { Order } from './entities/order.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddOrderDto } from './dto/add-order.dto';

@Injectable()
export class OrderService extends BaseService<Order> {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<Order>,
  ) {
    super(orderModel, AddOrderDto);
  }
}
