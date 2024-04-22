import { Controller } from '@nestjs/common';
import { BaseauthController } from '../baseauth/baseauth.controller';
import { Pharmacy } from 'src/pharmacy/entities/pharmacy.entity';
import { AuthPharmacyService } from './auth-pharmacy.service';

@Controller('pharmacy/api/v1/auth')
export class AuthPharmacyController extends BaseauthController<Pharmacy> {
  constructor(private authPharmacyService: AuthPharmacyService) {
    super(authPharmacyService);
  }
}
