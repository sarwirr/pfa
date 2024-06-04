import {
  Body,
  Controller,
  Get,
  Post,
  Put,
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
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { PharmacyAccessGuard } from 'src/pharmacy/guard/pharmacy.guard';
import { Pharmacy } from 'src/pharmacy/decorator/pharmacy.decorator';
import { DistributorAccessGuard } from 'src/distributor/guard/distributor.guard';
import { DistributorDec } from 'src/distributor/decorator/distributor.decorator';

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

  @Get('distributor')
  @ApiOperation({
    summary: 'Endpoint for getting all orders of a pharmacy',
  })
  @UseGuards(DistributorAccessGuard)
  async getOrderByDistributor(
    @DistributorDec('client_id') distributorId: string,
  ) {
    const result = await this.orderService.getorderByDistributor(distributorId);
    return { message: 'get all orders of a pharmacy', result: result };
  }

  @Sse('sse')
  @ApiOperation({
    summary:
      'Endpoint for sending notification from server to distributor for informing creation of new order',
  })
  @ExcludeTransformInterceptor()
  sse(): Observable<MessageEvents> {
    return fromEvent(this.eventEmitter, 'neworder').pipe(
      map((data) => {
        return { data: { response: data } };
      }),
    );
  }

  @Sse('confirmationMessage')
  @ApiOperation({
    summary:
      'Endpoint for sending notification from server to pharmacy for sending confirmation result',
  })
  @ExcludeTransformInterceptor()
  confirmation(): Observable<MessageEvents> {
    return fromEvent(this.eventEmitter, 'confirmation result').pipe(
      map((data) => {
        return { data: { response: data } };
      }),
    );
  }

  @Put('confirmation')
  @ApiOperation({
    summary: 'Endpoint for making order confirmation',
  })
  @ApiQuery({
    name: 'confirmation',
    description: 'order confirmation the value need to be true or false',
    type: 'string',
  })
  @ApiQuery({
    name: 'orderId',
    description: 'order Id',
    type: 'ObjectId',
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
    if (confirmationStatus) {
      this.eventEmitter.emit('confirmation result', {
        message: `The distributor has confirmed your order and it is under preparation`,
      });
    } else {
      this.eventEmitter.emit('confirmation result', {
        message: `The distributor has refused your order to check this contact him`,
      });
    }
    return { message: 'Order Confirmation', result: result };
  }

  @Put('delivery')
  @ApiOperation({
    summary: 'Endpoint for delivery status',
  })
  @ApiQuery({
    name: 'orderId',
    description: 'order Id',
    type: 'ObjectId',
  })
  async orderDelivery(@Query('orderId') orderId: ObjectId) {
    const result = await this.orderService.orderdelevery(orderId);
    this.eventEmitter.emit('confirmation result', {
      message: `Your order is coming to you`,
    });
    return { message: 'Order Delivery', result: result };
  }

  @Post('makeorder')
  @ApiOperation({
    summary: 'Endpoint for making a new order',
  })
  @UseGuards(PharmacyAccessGuard)
  async makeOrder(
    @Pharmacy('client_id') clientId: string,
    @Body() order: AddOrderDto,
  ) {
    const neworder = {
      ...order,
      pharmacy: clientId,
    };
    const result = await this.orderService.makeOrder(neworder);
    this.eventEmitter.emit('neworder', {
      message: `An order from the ${clientId} has come to you`,
    });
    return { message: 'make order', result: result };
  }
}
