import { Test, TestingModule } from '@nestjs/testing';
import { PatrimoineController } from './patrimoine.controller';

describe('PatrimoineController', () => {
  let controller: PatrimoineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PatrimoineController],
    }).compile();

    controller = module.get<PatrimoineController>(PatrimoineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
