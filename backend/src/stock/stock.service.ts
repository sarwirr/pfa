import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { Stock } from './entities/stock.entity';
import { Model } from 'mongoose';
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
}
