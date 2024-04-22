import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus } from '@nestjs/common';
import { PharmacyService } from './pharmacy.service';
import { CreatePharmacyDto } from './dto/create-pharmacy.dto';
import { UpdatePharmacyDto } from './dto/update-pharmacy.dto';

@Controller('pharmacy')
export class PharmacyController {
  constructor(private readonly pharmacyService: PharmacyService) {}

  @Get()
  findAll() {
    return this.pharmacyService.findAll();
  }

  

  @Get('calculate-distance')
  async getDistance(
    @Query('origin') origin: string,
    @Query('destination') destination: string
  ): Promise<string> {
    if (!origin || !destination) {
      throw new HttpException('Origin and destination are required', HttpStatus.BAD_REQUEST);
    }

    try {
      const distanceInfo = await this.pharmacyService.calculateDistance(origin, destination);
      return distanceInfo;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
@Get(':id')
  findOne(@Param('id') id: string) {
    return this.pharmacyService.findOne(id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePharmacyDto: UpdatePharmacyDto) {
    return this.pharmacyService.update(id, updatePharmacyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pharmacyService.remove(id);
  }
}
