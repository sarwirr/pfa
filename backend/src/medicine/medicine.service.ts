import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { Medicine } from './entities/medicine.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { AddMedicineDTO } from './dto/add-medicine.dto';

@Injectable()
export class MedicineService extends BaseService<Medicine> {
  constructor(
    @InjectModel(Medicine.name)
    private readonly medicineModel: Model<Medicine>,
  ) {
    super(medicineModel, AddMedicineDTO);
  }

  async create(newMedicine: AddMedicineDTO) {
    try {
      const medicines = await this.medicineModel.findOne({
        name: newMedicine.name,
      });
      if (!medicines) {
        return this.save(newMedicine);
      } else {
        const addedmedicine = await this.medicineModel.findByIdAndUpdate(
          medicines['_id'],
          { $push: { distributor: newMedicine.distributor } },
          { new: true, useFindAndModify: false },
        );
        return addedmedicine;
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getMedicineBydistributor(distributor_id: ObjectId) {
    const medicines = await this.medicineModel
      .find({
        distributor: distributor_id,
      })
      .populate('distributor');
    return medicines;
  }
}
