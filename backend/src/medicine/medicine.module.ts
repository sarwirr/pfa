import { Module } from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { MedicineController } from './medicine.controller';

@Module({
  providers: [MedicineService],
  controllers: [MedicineController]
})
export class MedicineModule {}
