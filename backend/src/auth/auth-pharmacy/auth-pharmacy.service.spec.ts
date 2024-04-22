import { Test, TestingModule } from '@nestjs/testing';
import { AuthPharmacyService } from './auth-pharmacy.service';

describe('AuthPharmacyService', () => {
  let service: AuthPharmacyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthPharmacyService],
    }).compile();

    service = module.get<AuthPharmacyService>(AuthPharmacyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
