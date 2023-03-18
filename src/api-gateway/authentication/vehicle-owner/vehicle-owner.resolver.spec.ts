import { Test, TestingModule } from '@nestjs/testing';
import { VehicleOwnerResolver } from './vehicle-owner.resolver';

describe('VehicleOwnerResolver', () => {
  let resolver: VehicleOwnerResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VehicleOwnerResolver],
    }).compile();

    resolver = module.get<VehicleOwnerResolver>(VehicleOwnerResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
