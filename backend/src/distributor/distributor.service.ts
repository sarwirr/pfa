import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { Distributor } from './entities/distributor.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class DistributorService extends BaseService<Distributor> {
  constructor(
    @InjectModel(Distributor.name)
    private readonly distibutorModel: Model<Distributor>,
  ) {
    super(distibutorModel);
  }
}
