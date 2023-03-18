import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LoggerResolver } from './logger.resolver';
import { LoggerFrameworkAbstract } from './abstracts/logger-framework.abstract';
import { LoggerWinstonService } from './logger-winston.service';
import { LoggerServiceAbstract } from './abstracts/logger-service.abstract';

@Module({
  providers: [
    LoggerService,
    LoggerResolver,
    {
      provide: LoggerFrameworkAbstract,
      useClass: LoggerWinstonService,
    },
    {
      provide: LoggerServiceAbstract,
      useClass: LoggerService,
    },
  ],
  exports: [LoggerService],
})
export class LoggerModule {}
