import { Module } from '@nestjs/common';
import { PharmacyService } from './pharmacy.service';
import { PharmacyController } from './pharmacy.controller';
import { BaseService } from 'src/base/base.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Pharmacy, PharmacySchema } from './entities/pharmacy.entity';
import { HttpModule } from '@nestjs/axios';
import {
  Distributor,
  DistributorSchema,
} from 'src/distributor/entities/distributor.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Pharmacy.name, schema: PharmacySchema },
      { name: Distributor.name, schema: DistributorSchema },
    ]),
    HttpModule,
  ],
  controllers: [PharmacyController],
  providers: [PharmacyService, BaseService],
})
export class PharmacyModule {}
