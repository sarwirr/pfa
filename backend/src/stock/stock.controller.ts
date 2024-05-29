import { Body, Controller, Post } from '@nestjs/common';
import { BaseController } from 'src/base/base.controller';
import { Stock } from './entities/stock.entity';
import { StockService } from './stock.service';
import { AddStockDTO } from './dto/add-stock.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Stock')
@Controller('stock')
export class StockController extends BaseController<Stock> {
  constructor(private stockService: StockService) {
    super(stockService);
  }

  @Post('add')
  @ApiOperation({ summary: 'Add stock to pharmacy and distributor' })
  addmedicine(@Body() stock: AddStockDTO) {
    const result = this.stockService.save(stock);
    return { message: 'Stock added it successfully', result: result };
  }
}
