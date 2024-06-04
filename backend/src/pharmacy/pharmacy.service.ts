import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pharmacy } from './entities/pharmacy.entity';
import { BaseService } from 'src/base/base.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Distributor } from 'src/distributor/entities/distributor.entity';
import { getCoordinates } from 'src/common/helpers/location';

@Injectable()
export class PharmacyService extends BaseService<Pharmacy> {
  constructor(
    @InjectModel(Pharmacy.name) private pharmacyModel: Model<Pharmacy>,
    @InjectModel(Distributor.name) private distributorModel: Model<Distributor>,
    private httpService: HttpService,
  ) {
    super(pharmacyModel);
  }

  async calculateDistance(origin: string, destination: string) {
    const apiKey = process.env.API_KEY;
    const url = `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${encodeURIComponent(
      origin,
    )}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
      const response = await firstValueFrom(this.httpService.get(url)); // Updated to use firstValueFrom

      if (response.data.status === 'OK') {
        const distance = response.data.rows[0].elements[0].distance.text;
        const duration = response.data.rows[0].elements[0].duration.text;
        const phrase = `The distance between the two locations is ${distance} and it takes approximately ${duration}.`;
        console.log('address: ', destination);
        return { distance: distance, duration: duration };
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

  async getdistributors(clientId: string) {
    try {
      const distributors = await this.distributorModel.find();
      const pharmacy = await this.pharmacyModel.findOne({
        clientId: clientId,
      });
      if (pharmacy && distributors) {
        const pharmacyAddress = pharmacy.address;
        let distributorList = [];

        const distributorPromises = distributors.map(async (distributor) => {
          const distributorAddress = distributor.address;
          const distance = await this.calculateDistance(
            pharmacyAddress,
            distributorAddress,
          );
          const coordinates = await getCoordinates(
            distributorAddress,
            this.httpService,
          );
          const distrib = {
            distributor: distributor,
            distance: distance,
            coordinates: coordinates,
          };
          return distrib;
        });

        distributorList = await Promise.all(distributorPromises);
        return distributorList;
      } else {
        throw new Error(
          'there is no distributor or pharmacy with this object Id',
        );
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findPharmacyById(pharmacyClientId: string) {
    try {
      const pharmacy = await this.pharmacyModel.findOne({
        clientId: pharmacyClientId,
      });
      const coordinates = await getCoordinates(
        pharmacy.address,
        this.httpService,
      );
      const newpharmacy = {
        pharmacy,
        coordinates: coordinates,
      };
      return newpharmacy;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
