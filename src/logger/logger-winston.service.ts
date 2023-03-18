import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { LoggerFrameworkAbstract } from './abstracts/logger-framework.abstract';
import { CreateLogDto } from './dtos/log.dto';

@Injectable()
export class LoggerWinstonService implements LoggerFrameworkAbstract {
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: any) {}

  logInFile(logdata: CreateLogDto): boolean {
    let status = false;
    if (this.logger.logger.log('alert', `${JSON.stringify(logdata)}`)) {
      status = true;
    }
    return status;
  }
}
