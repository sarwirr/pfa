import { Module } from '@nestjs/common';
import { DistributorService } from './distributor.service';
import { DistributorController } from './distributor.controller';

@Module({
  providers: [DistributorService],
  controllers: [DistributorController]
})
export class DistributorModule {}
