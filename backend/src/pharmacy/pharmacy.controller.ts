import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PharmacyService } from './pharmacy.service';

@Controller('pharmacy')
export class PharmacyController {
  constructor(private readonly pharmacyService: PharmacyService) {}

  @Get()
  findAll() {
    const result = this.pharmacyService.getAll();
    return { message: 'get all pharmacies', result: result };
  }

  @Get('calculate-distance')
  async getDistance(
    @Query('origin') origin: string,
    @Query('destination') destination: string,
  ) {
    if (!origin || !destination) {
      throw new HttpException(
        'Origin and destination are required',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const distanceInfo = await this.pharmacyService.calculateDistance(
        origin,
        destination,
      );
      return { message: 'Pharmacie distance', result: distanceInfo };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    const result = this.pharmacyService.findById(id);
    return { message: 'get pharmacie by id', result: result };
  }

  @Delete(':id')
  deleteById(@Param('id') id: string) {
    const result = this.pharmacyService.deleteById(id);
    return { message: 'Pharmacie removed by id', result: result };
  }
}
