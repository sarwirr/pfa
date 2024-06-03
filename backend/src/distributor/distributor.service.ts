import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BaseService } from 'src/base/base.service';
import { Distributor } from './entities/distributor.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { getCoordinates } from 'src/common/helpers/location';
import { HttpService } from '@nestjs/axios';
import { PharmacyService } from 'src/pharmacy/pharmacy.service';
import { Pharmacy } from 'src/pharmacy/entities/pharmacy.entity';

@Injectable()
export class DistributorService extends BaseService<Distributor> {
  constructor(
    @InjectModel(Distributor.name)
    private readonly distributorModel: Model<Distributor>,
    @InjectModel(Pharmacy.name)
    private readonly pharmacyModel: Model<Pharmacy>,
    private httpService: HttpService,
    private pharmacyService: PharmacyService,
  ) {
    super(distributorModel);
  }

  async findDistributorById(distributorClientId: string) {
    try {
      const distributor = await this.distributorModel.findOne({
        clientId: distributorClientId,
      });
      const coordinates = await getCoordinates(
        distributor.address,
        this.httpService,
      );
      const newdistributor = {
        distributor,
        coordinates: coordinates,
      };
      return newdistributor;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async getpharmacies(clientId: string) {
    try {
      const pharmacies = await this.pharmacyModel.find();
      const distributor = await this.distributorModel.findOne({
        clientId: clientId,
      });
      if (distributor && pharmacies) {
        const distributorAddress = distributor.address;
        let distributorList = [];

        const pharmacyPromises = pharmacies.map(async (pharmacy) => {
          const pharmacyAddress = pharmacy.address;
          const distance = await this.pharmacyService.calculateDistance(
            pharmacyAddress,
            distributorAddress,
          );
          const coordinates = await getCoordinates(
            pharmacyAddress,
            this.httpService,
          );
          const pharma = {
            pharmacy: pharmacy,
            distance: distance,
            coordinates: coordinates,
          };
          return pharma;
        });

        distributorList = await Promise.all(pharmacyPromises);
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
}
