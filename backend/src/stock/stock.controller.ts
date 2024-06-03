import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { BaseController } from 'src/base/base.controller';
import { Stock } from './entities/stock.entity';
import { StockService } from './stock.service';
import { AddStockDTO } from './dto/add-stock.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { DistributorAccessGuard } from 'src/distributor/guard/distributor.guard';
import { DistributorDec } from 'src/distributor/decorator/distributor.decorator';

@ApiTags('Stock')
@Controller('stock')
export class StockController extends BaseController<Stock> {
  constructor(private stockService: StockService) {
    super(stockService);
  }

  @Get('distributor')
  @ApiOperation({ summary: 'Get distributor stock' })
  @UseGuards(DistributorAccessGuard)
  async getByDistributor(@DistributorDec('client_id') distributorId: string) {
    const result = await this.stockService.getStockByDistributor(distributorId);
    return { message: 'Distributor Stock', result: result };
  }

  @Post('add')
  @ApiOperation({ summary: 'Add stock to pharmacy and distributor' })
  @UseGuards(DistributorAccessGuard)
  async addmedicine(
    @Body() stock: AddStockDTO,
    @DistributorDec('client_id') distributorId: string,
  ) {
    const newstock = {
      ...stock,
      distributor: distributorId,
    };
    const result = await this.stockService.save(newstock);
    return { message: 'Stock added it successfully', result: result };
  }
}
