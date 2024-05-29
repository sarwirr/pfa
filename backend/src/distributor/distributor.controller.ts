import { Controller } from '@nestjs/common';
import { BaseController } from 'src/base/base.controller';
import { Distributor } from './entities/distributor.entity';
import { DistributorService } from './distributor.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Distributor')
@Controller('distributor')
export class DistributorController extends BaseController<Distributor> {
  constructor(private distributorService: DistributorService) {
    super(distributorService);
  }
}
