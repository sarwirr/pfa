import { Body, Controller, Post } from '@nestjs/common';
import { BaseController } from 'src/base/base.controller';
import { MedicineService } from './medicine.service';
import { Medicine } from './entities/medicine.entity';
import { AddMedicineDTO } from './dto/add-medicine.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Medicine')
@Controller('medicine')
export class MedicineController extends BaseController<Medicine> {
  constructor(private medicineService: MedicineService) {
    super(medicineService);
  }

  @ApiOperation({
    summary: 'Add a medicine to stock',
  })
  @Post('add')
  addmedicine(@Body() medicine: AddMedicineDTO) {
    const result = this.medicineService.save(medicine);
    return { message: 'Medicine added it successfully', result: result };
  }
}
