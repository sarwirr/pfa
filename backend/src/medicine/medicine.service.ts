import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { Medicine } from './entities/medicine.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddMedicineDTO } from './dto/add-medicine.dto';

@Injectable()
export class MedicineService extends BaseService<Medicine> {
  constructor(
    @InjectModel(Medicine.name)
    private readonly medicineModel: Model<Medicine>,
  ) {
    super(medicineModel, AddMedicineDTO);
  }
}
