import { Injectable } from '@nestjs/common';
import { CreatePharmacyDto } from './dto/create-pharmacy.dto';
import { UpdatePharmacyDto } from './dto/update-pharmacy.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pharmacy } from './entities/pharmacy.entity';
import { BaseService } from 'src/base/base.service';

@Injectable()
export class PharmacyService extends BaseService<Pharmacy>{
  constructor(
    @InjectModel(Pharmacy.name) private pharmacyModel: Model<Pharmacy>
  ){
    super(pharmacyModel);
  }

  findAll() {
    return 'all works well';
  }

  findOne(id: string) {
    return this.findById(id);
  }

  update(id: string, updatePharmacyDto: UpdatePharmacyDto) {
    return `This action updates a #${id} pharmacy`;
  }

  remove(id: string) {
    return this.deleteById(id);
  }
}
