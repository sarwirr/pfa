import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { Order } from './entities/order.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { AddOrderDto } from './dto/add-order.dto';
import { Orderstatus } from 'src/common/enum/status.enum';
import { Distributor } from 'src/distributor/entities/distributor.entity';
import { Pharmacy } from 'src/pharmacy/entities/pharmacy.entity';

@Injectable()
export class OrderService extends BaseService<Order> {
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<Order>,
    @InjectModel(Distributor.name)
    private readonly distributorModel: Model<Distributor>,
    @InjectModel(Pharmacy.name)
    private readonly pharmacyModel: Model<Pharmacy>,
  ) {
    super(orderModel, AddOrderDto);
  }

  async makeOrder(neworder: AddOrderDto) {
    try {
      const medicine_quantities = neworder.medicine_quantity;
      let totalprice = 0;
      let medicine_quantity = [];
      medicine_quantities.map((medicine) => {
        const medicineTotalPrice = medicine.price * medicine.quantity;
        medicine = {
          ...medicine,
          medicineTotalPrice: medicineTotalPrice,
        };
        medicine_quantity.push(medicine);
        totalprice += medicineTotalPrice;
      });
      const totalorder = {
        ...neworder,
        medicine_quantity: medicine_quantity,
        total_price: totalprice,
      };
      const order = await this.orderModel.create(totalorder);
      return order.save();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getorderByPharmacy(pharmacy_id: string) {
    try {
      const orders = await this.orderModel
        .find({ pharmacy: pharmacy_id })
        .populate(['medicine_quantity.medicine'])
        .exec();
      let returnedorder = [];
      const returnedorderPromises = orders.map(async (order) => {
        const distributor = await this.distributorModel.findOne({
          clientId: order.distributor,
        });
        const neworder = {
          ...order['_doc'],
          distributor: distributor,
        };
        return neworder;
      });
      returnedorder = await Promise.all(returnedorderPromises);
      return returnedorder;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getorderByDistributor(distributor_id: string) {
    try {
      const orders = await this.orderModel
        .find({ distributor: distributor_id })
        .populate(['medicine_quantity.medicine'])
        .exec();
      let returnedorder = [];
      const returnedorderPromises = orders.map(async (order) => {
        const pharmacy = await this.pharmacyModel.findOne({
          clientId: order.pharmacy,
        });
        const neworder = {
          ...order['_doc'],
          pharmacy: pharmacy,
        };
        return neworder;
      });
      returnedorder = await Promise.all(returnedorderPromises);
      return returnedorder;
      return orders;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async orderConfirmation(orderId: ObjectId, confirmationStatus: boolean) {
    try {
      const order = await this.orderModel.findById(orderId);
      if (!order) {
        throw new HttpException(
          'There is no order with this orderId',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        order.confirmation = true;
        if (!confirmationStatus) {
          order.status = Orderstatus.Refused;
        } else {
          order.status = Orderstatus.InPreparing;
        }
        return await order.save();
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async orderdelevery(orderId: ObjectId) {
    try {
      const order = await this.orderModel.findById(orderId);
      if (!order) {
        throw new HttpException(
          'There is no order with this orderId',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        order.status = Orderstatus.Delivery;
        return await order.save();
      }
    } catch (error) {}
  }

  async orderConfirme(orderId: ObjectId) {
    try {
      const order = await this.orderModel.findById(orderId);
      if (!order) {
        throw new HttpException(
          'There is no order with this orderId',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        order.status = Orderstatus.Done;
        return await order.save();
      }
    } catch (error) {}
  }
}
