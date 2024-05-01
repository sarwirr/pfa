import { Module } from '@nestjs/common';
import { DistributorService } from './distributor.service';
import { DistributorController } from './distributor.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Distributor, DistributorSchema } from './entities/distributor.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Distributor.name, schema: DistributorSchema },
    ]),
  ],
  providers: [DistributorService],
  controllers: [DistributorController],
})
export class DistributorModule {}
