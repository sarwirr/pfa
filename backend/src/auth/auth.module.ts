import { Module } from '@nestjs/common';

import { AwsCognitoService } from './aws-cognito/aws-cognito.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Pharmacy,
  PharmacySchema,
} from 'src/pharmacy/entities/pharmacy.entity';
import { AuthDistributorController } from './auth-distributor/auth-distributor.controller';
import { AuthDistributorService } from './auth-distributor/auth-distributor.service';
import { AuthPharmacyController } from './auth-pharmacy/auth-pharmacy.controller';
import {
  Distributor,
  DistributorSchema,
} from 'src/distributor/entities/distributor.entity';
import { AuthPharmacyService } from './auth-pharmacy/auth-pharmacy.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

const mongooseFeartures = [
  { name: Pharmacy.name, schema: PharmacySchema },
  { name: Distributor.name, schema: DistributorSchema },
];

@Module({
  imports: [
    MongooseModule.forFeature(mongooseFeartures),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthDistributorController, AuthPharmacyController],
  providers: [
    AwsCognitoService,
    AuthDistributorService,
    AuthPharmacyService,
    JwtStrategy,
  ],
})
export class AuthModule {}
