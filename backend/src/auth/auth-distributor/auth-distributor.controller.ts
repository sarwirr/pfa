import { Controller } from '@nestjs/common';
import { BaseauthController } from '../baseauth/baseauth.controller';
import { Distributor } from 'src/distributor/entities/distributor.entity';
import { AuthDistributorService } from './auth-distributor.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Distributor')
@Controller('distributor/api/v1/auth')
export class AuthDistributorController extends BaseauthController<Distributor> {
  constructor(private authDistributorService: AuthDistributorService) {
    super(authDistributorService);
  }
}
