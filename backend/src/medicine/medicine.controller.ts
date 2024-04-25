import { Body, Controller, Post } from '@nestjs/common';
import { BaseController } from 'src/base/base.controller';
import { MedicineService } from './medicine.service';
import { Medicine } from './entities/medicine.entity';
import { AddMedicineDTO } from './dto/add-medicine.dto';

@Controller('medicine')
export class MedicineController extends BaseController<Medicine> {
  constructor(private medicineService: MedicineService) {
    super(medicineService);
  }

  @Post('add')
  addmedicine(@Body() medicine: AddMedicineDTO) {
    const result = this.medicineService.save(medicine);
    return { message: 'Medicine added it successfully', result: result };
  }
}
