import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  ParseFilePipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BaseController } from 'src/base/base.controller';
import { MedicineService } from './medicine.service';
import { Medicine } from './entities/medicine.entity';
import { AddMedicineDTO } from './dto/add-medicine.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import 'multer';
@ApiTags('Medicine')
@Controller('medicine')
export class MedicineController extends BaseController<Medicine> {
  constructor(private medicineService: MedicineService) {
    super(medicineService);
  }

  @ApiOperation({
    summary: 'Add a medicine to database',
  })
  @Post('add')
  @UseInterceptors(FileInterceptor('file'))
  async addmedicine(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' })],
        fileIsRequired: true,
      }),
    )
    file: Express.Multer.File,
    @Body() medicine: AddMedicineDTO,
  ) {
    console.log(typeof medicine.price);
    const result = await this.medicineService.create(medicine, file);
    return { message: 'Medicine added it successfully', result: result };
  }
}
