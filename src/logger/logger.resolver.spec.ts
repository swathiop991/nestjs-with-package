import { Test, TestingModule } from '@nestjs/testing';
import { LoggerResolver } from './logger.resolver';

describe('LoggerResolver', () => {
  let resolver: LoggerResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoggerResolver],
    }).compile();

    resolver = module.get<LoggerResolver>(LoggerResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
