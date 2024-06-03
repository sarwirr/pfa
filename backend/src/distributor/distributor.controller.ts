import { Controller, Get, UseGuards } from '@nestjs/common';
import { BaseController } from 'src/base/base.controller';
import { DistributorService } from './distributor.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DistributorAccessGuard } from './guard/distributor.guard';
import { DistributorDec } from './decorator/distributor.decorator';
import { Distributor } from './entities/distributor.entity';

@ApiTags('Distributor')
@Controller('distributor')
export class DistributorController extends BaseController<Distributor> {
  constructor(private distributorService: DistributorService) {
    super(distributorService);
  }

  @Get()
  @ApiOperation({ summary: 'Get distributor information' })
  @UseGuards(DistributorAccessGuard)
  async getdistributor(@DistributorDec('client_id') distributorId: string) {
    const result = await this.distributorService.findDistributorById(
      distributorId,
    );
    return { message: 'get distributor by id', result: result };
  }

  @Get('/pharmacy')
  @ApiOperation({ summary: 'Find all pharmacies' })
  @UseGuards(DistributorAccessGuard)
  async getpharmacies(@DistributorDec('client_id') client_id: string) {
    const result = await this.distributorService.getpharmacies(client_id);
    return { message: 'get all pharmacies', result: result };
  }
}
