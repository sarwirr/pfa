import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { Medicine } from './entities/medicine.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddMedicineDTO } from './dto/add-medicine.dto';
import { DmsService } from 'src/dms/dms.service';
import { Express } from 'express';

@Injectable()
export class MedicineService extends BaseService<Medicine> {
  constructor(
    @InjectModel(Medicine.name)
    private readonly medicineModel: Model<Medicine>,
    private readonly dmsService: DmsService,
  ) {
    super(medicineModel, AddMedicineDTO);
  }

  async create(newMedicine: AddMedicineDTO, file: Express.Multer.File) {
    try {
      const medicine = await this.medicineModel.findOne({
        name: newMedicine.name,
      });
      if (!medicine) {
        const filepath = await this.dmsService.uploadSingleFile({
          file,
          isPublic: true,
        });
        const imagePath = filepath.url;
        const medicineObject = {
          ...newMedicine,
          imageUrl: imagePath,
        };
        return this.save(medicineObject);
      } else {
        throw new HttpException('Medicine already Exist', HttpStatus.CONFLICT);
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
