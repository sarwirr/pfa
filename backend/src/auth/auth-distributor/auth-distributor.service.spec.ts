import { Test, TestingModule } from '@nestjs/testing';
import { AuthDistributorService } from './auth-distributor.service';

describe('AuthDistributorService', () => {
  let service: AuthDistributorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthDistributorService],
    }).compile();

    service = module.get<AuthDistributorService>(AuthDistributorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
