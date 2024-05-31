import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { BaseController } from 'src/base/base.controller';
import { Stock } from './entities/stock.entity';
import { StockService } from './stock.service';
import { AddStockDTO } from './dto/add-stock.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

@ApiTags('Stock')
@Controller('stock')
export class StockController extends BaseController<Stock> {
  constructor(private stockService: StockService) {
    super(stockService);
  }

  @Get('distributor')
  @ApiOperation({ summary: 'Get distributor stock' })
  async getByDistributor(@Query('distributorId') distributorId: ObjectId) {
    const result = await this.stockService.getStockByDistributor(distributorId);
    return { message: 'Distributor Stock', result: result };
  }

  @Post('add')
  @ApiOperation({ summary: 'Add stock to pharmacy and distributor' })
  async addmedicine(@Body() stock: AddStockDTO) {
    const result = await this.stockService.save(stock);
    return { message: 'Stock added it successfully', result: result };
  }
}
