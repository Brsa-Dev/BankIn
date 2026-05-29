import { Test, TestingModule } from '@nestjs/testing';
import { PatrimoineService } from './patrimoine.service';

describe('PatrimoineService', () => {
  let service: PatrimoineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PatrimoineService],
    }).compile();

    service = module.get<PatrimoineService>(PatrimoineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
