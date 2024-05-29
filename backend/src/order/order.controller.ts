import { Body, Controller, Post, Sse } from '@nestjs/common';
import { BaseController } from 'src/base/base.controller';
import { Order } from './entities/order.entity';
import { OrderService } from './order.service';
import { AddOrderDto } from './dto/add-order.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Observable, fromEvent, map } from 'rxjs';
import { ExcludeTransformInterceptor } from 'src/common/interceptor/interceptor.interceptor';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

interface MessageEvents {
  data: string | object;
  id?: string;
  type?: string;
  retry?: number;
}

@ApiTags('Order')
@Controller('order')
export class OrderController extends BaseController<Order> {
  constructor(
    private orderService: OrderService,
    private eventEmitter: EventEmitter2,
  ) {
    super(orderService);
  }

  @Sse('sse')
  @ApiOperation({
    summary: 'Endpoint for sending notification from server to users',
  })
  @ExcludeTransformInterceptor()
  sse(): Observable<MessageEvents> {
    return fromEvent(this.eventEmitter, 'neworder').pipe(
      map((data) => {
        return { data: { response: data } };
      }),
    );
  }

  @Post('makeorder')
  @ApiOperation({
    summary: 'Endpoint for making a new order',
  })
  makeOrder(@Body() order: AddOrderDto) {
    this.eventEmitter.emit('neworder', {
      message: 'hi',
    });
    const result = this.orderService.save(order);
    return { message: 'make order', result: {} };
  }
}
