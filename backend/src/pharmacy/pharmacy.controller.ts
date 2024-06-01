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
  UseGuards,
} from '@nestjs/common';
import { PharmacyService } from './pharmacy.service';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PharmacyAccessGuard } from './guard/pharmacy.guard';
import { Pharmacy } from './decorator/pharmacy.decorator';

@ApiTags('Pharmacy')
@Controller('pharmacy')
export class PharmacyController {
  constructor(private readonly pharmacyService: PharmacyService) {}

  @Get()
  @ApiOperation({ summary: 'Find pharmacy by Id' })
  @UseGuards(PharmacyAccessGuard)
  async findById(@Pharmacy('client_id') pharmacyclientId: string) {
    console.log(pharmacyclientId);
    const result = await this.pharmacyService.findPharmacyById(
      pharmacyclientId,
    );
    return { message: 'get pharmacie by id', result: result };
  }

  @Get('/all')
  @ApiOperation({ summary: 'Find all pharmacies' })
  async findAll() {
    const result = await this.pharmacyService.getAll();
    return { message: 'get all pharmacies', result: result };
  }

  @Get('/distributor')
  @ApiOperation({ summary: 'Find all distributors' })
  @UseGuards(PharmacyAccessGuard)
  async getdistributor(@Pharmacy('client_id') client_id: string) {
    const result = await this.pharmacyService.getdistributors(client_id);
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

  @Delete(':id')
  @ApiOperation({ summary: 'delete pharmacy by Id' })
  deleteById(@Param('id') id: string) {
    const result = this.pharmacyService.deleteById(id);
    return { message: 'Pharmacie removed by id', result: result };
  }
}
