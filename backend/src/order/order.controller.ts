import { Body, Controller, Post, Sse } from '@nestjs/common';
import { BaseController } from 'src/base/base.controller';
import { Order } from './entities/order.entity';
import { OrderService } from './order.service';
import { AddOrderDto } from './dto/add-order.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Observable, fromEvent, map } from 'rxjs';
import { ExcludeTransformInterceptor } from 'src/common/interceptor/interceptor.interceptor';

interface MessageEvents {
  data: string | object;
  id?: string;
  type?: string;
  retry?: number;
}

@Controller('order')
export class OrderController extends BaseController<Order> {
  constructor(
    private orderService: OrderService,
    private eventEmitter: EventEmitter2,
  ) {
    super(orderService);
  }

  @Sse('sse')
  @ExcludeTransformInterceptor()
  sse(): Observable<MessageEvents> {
    return fromEvent(this.eventEmitter, 'neworder').pipe(
      map((data) => {
        return { data: { response: data } };
      }),
    );
  }

  @Post('makeorder')
  makeOrder(@Body() order: AddOrderDto) {
    this.eventEmitter.emit('neworder', {
      message: 'hi',
    });
    const result = this.orderService.save(order);
    return { message: 'make order', result: {} };
  }
}
