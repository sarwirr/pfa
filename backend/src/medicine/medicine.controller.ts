import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { BaseController } from 'src/base/base.controller';
import { MedicineService } from './medicine.service';
import { Medicine } from './entities/medicine.entity';
import { AddMedicineDTO } from './dto/add-medicine.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

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
  async addmedicine(@Body() medicine: AddMedicineDTO) {
    const result = await this.medicineService.create(medicine);
    return { message: 'Medicine added it successfully', result: result };
  }

  @Get('bydistributor')
  async getmedicinebydistributor(
    @Query('distributorId') distributorId: ObjectId,
  ) {
    const result = await this.medicineService.getMedicineBydistributor(
      distributorId,
    );
    return { message: 'all medicine by distributor', result: result };
  }
}
