import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { Stock } from './entities/stock.entity';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AddStockDTO } from './dto/add-stock.dto';

@Injectable()
export class StockService extends BaseService<Stock> {
  constructor(
    @InjectModel(Stock.name)
    private readonly stockModel: Model<Stock>,
  ) {
    super(stockModel, AddStockDTO);
  }

  async getStockByDistributor(distributor_id: ObjectId) {
    try {
      const stock = (
        await this.stockModel.findOne({ distributor: distributor_id })
      ).populate(['distributor', 'medicine_quantity.medicine']);
      return stock;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
