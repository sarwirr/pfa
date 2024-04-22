import { Injectable } from '@nestjs/common';
import { BaseauthService } from '../baseauth/baseauth.service';
import { Distributor } from 'src/distributor/entities/distributor.entity';
import * as dotenv from 'dotenv';
import { AwsCognitoService } from '../aws-cognito/aws-cognito.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

dotenv.config();

const userPoolId = process.env.AWS_COGNITO_USER_POOL_ID_Distributor;
const clientId = process.env.AWS_COGNITO_CLIENT_ID_Distributor;

@Injectable()
export class AuthDistributorService extends BaseauthService<Distributor> {
  constructor(
    awscognitoService: AwsCognitoService,
    @InjectModel(Distributor.name) pharmacyModel: Model<Distributor>,
  ) {
    super(awscognitoService, pharmacyModel, userPoolId, clientId);
  }
}
