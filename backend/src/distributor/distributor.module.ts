import { Module } from '@nestjs/common';
import { DistributorService } from './distributor.service';
import { DistributorController } from './distributor.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Distributor, DistributorSchema } from './entities/distributor.entity';
import { HttpModule } from '@nestjs/axios';
import {
  Pharmacy,
  PharmacySchema,
} from 'src/pharmacy/entities/pharmacy.entity';
import { PharmacyModule } from 'src/pharmacy/pharmacy.module';
import { PharmacyService } from 'src/pharmacy/pharmacy.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Distributor.name, schema: DistributorSchema },
      { name: Pharmacy.name, schema: PharmacySchema },
    ]),
    HttpModule,
  ],
  providers: [DistributorService, PharmacyService],
  controllers: [DistributorController],
})
export class DistributorModule {}
