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
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

@ApiTags('Pharmacy')
@Controller('pharmacy')
export class PharmacyController {
  constructor(private readonly pharmacyService: PharmacyService) {}

  @Get()
  @ApiOperation({ summary: 'Find all pharmacies' })
  async findAll() {
    const result = await this.pharmacyService.getAll();
    return { message: 'get all pharmacies', result: result };
  }

  @Get('/distributor')
  @ApiOperation({ summary: 'Find all distributors' })
  @ApiQuery({
    name: 'pharmacyId',
    description: 'ID of the pharmacy',
    type: 'objectId',
  })
  async getdistributor(@Query('pharmacyId') pharmacyId: ObjectId) {
    const result = await this.pharmacyService.getdistributors(pharmacyId);
    return { message: 'get all distributors', result: result };
  }

  @Get('calculate-distance')
  @ApiOperation({ summary: 'Get distance between pharmnacy and distibutors' })
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
  @ApiOperation({ summary: 'Find pharmacy by Id' })
  findById(@Param('id') id: string) {
    const result = this.pharmacyService.findById(id);
    return { message: 'get pharmacie by id', result: result };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete pharmacy by Id' })
  deleteById(@Param('id') id: string) {
    const result = this.pharmacyService.deleteById(id);
    return { message: 'Pharmacie removed by id', result: result };
  }
}
