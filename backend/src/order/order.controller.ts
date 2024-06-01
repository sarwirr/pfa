import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Sse,
  UseGuards,
} from '@nestjs/common';
import { BaseController } from 'src/base/base.controller';
import { Order } from './entities/order.entity';
import { OrderService } from './order.service';
import { AddOrderDto } from './dto/add-order.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Observable, fromEvent, map } from 'rxjs';
import { ExcludeTransformInterceptor } from 'src/common/interceptor/interceptor.interceptor';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { PharmacyAccessGuard } from 'src/pharmacy/guard/pharmacy.guard';
import { Pharmacy } from 'src/pharmacy/decorator/pharmacy.decorator';

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

  @Get('pharmacy')
  @ApiOperation({
    summary: 'Endpoint for getting all orders of a pharmacy',
  })
  @UseGuards(PharmacyAccessGuard)
  async getOrderByPharmacy(@Pharmacy('client_id') pharmacyId: string) {
    const result = await this.orderService.getorderByPharmacy(pharmacyId);
    return { message: 'get all orders of a pharmacy', result: result };
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

  @Get('confirmation')
  @ApiOperation({
    summary: 'Endpoint for making order confirmation',
  })
  async orderConfirmation(
    @Query('confirmation') confirmation: string,
    @Query('orderId') orderId: ObjectId,
  ) {
    const confirmationStatus = confirmation === 'true' ? true : false;
    const result = await this.orderService.orderConfirmation(
      orderId,
      confirmationStatus,
    );
    return { message: 'Order Confirmation', result: result };
  }

  @Post('makeorder')
  @ApiOperation({
    summary: 'Endpoint for making a new order',
  })
  async makeOrder(@Body() order: AddOrderDto) {
    this.eventEmitter.emit('neworder', {
      message: 'hi',
    });
    const result = await this.orderService.makeOrder(order);
    return { message: 'make order', result: result };
  }
}
