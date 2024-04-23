import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pharmacy } from './entities/pharmacy.entity';
import { BaseService } from 'src/base/base.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PharmacyService extends BaseService<Pharmacy> {
  constructor(
    @InjectModel(Pharmacy.name) private pharmacyModel: Model<Pharmacy>,
    private httpService: HttpService,
  ) {
    super(pharmacyModel);
  }

  async calculateDistance(
    origin: string,
    destination: string,
  ): Promise<string> {
    const apiKey = process.env.API_KEY;
    const url = `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${encodeURIComponent(
      origin,
    )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
      const response = await firstValueFrom(this.httpService.get(url)); // Updated to use firstValueFrom
      console.log('API Response:', JSON.stringify(response.data, null, 2)); // Log the full response

      if (response.data.status === 'OK') {
        const distance = response.data.rows[0].elements[0].distance.text;
        const duration = response.data.rows[0].elements[0].duration.text;
        return `The distance between the two locations is ${distance} and it takes approximately ${duration}.`;
      } else {
        return `Failed to calculate distance with status: ${response.data.status}`;
      }
    } catch (error) {
      console.error('Error calling the Distance Matrix API:', error);
      throw new Error(
        'Failed to calculate distance due to an error with the Distance Matrix API.',
      );
    }
  }
}
