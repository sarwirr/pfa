import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pharmacy } from 'src/pharmacy/entities/pharmacy.entity';
import * as dotenv from 'dotenv';
import { BaseauthService } from '../baseauth/baseauth.service';
import { AwsCognitoService } from '../aws-cognito/aws-cognito.service';

dotenv.config();

const userPoolId = process.env.AWS_COGNITO_USER_POOL_ID_Pharmacy;
const clientId = process.env.AWS_COGNITO_CLIENT_ID_Pharmacy;

@Injectable()
export class AuthPharmacyService extends BaseauthService<Pharmacy> {
  constructor(
    awscognitoService: AwsCognitoService,
    @InjectModel(Pharmacy.name) pharmacyModel: Model<Pharmacy>,
  ) {
    super(awscognitoService, pharmacyModel, userPoolId, clientId);
  }
}
