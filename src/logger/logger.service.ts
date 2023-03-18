import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LogPriority } from '@shared/constants';
import { LoggerFrameworkAbstract } from './abstracts/logger-framework.abstract';
import { LoggerServiceAbstract } from './abstracts/logger-service.abstract';
import { CreateLogDto } from './dtos/log.dto';

@Injectable()
export class LoggerService implements LoggerServiceAbstract {
  constructor(private readonly loggerFrameworkAbstract: LoggerFrameworkAbstract) {}

  logDetailsInFile = async (logData: CreateLogDto) => {
    const loggerResData = await this.loggerFrameworkAbstract.logInFile(logData);
    if (!loggerResData)
      throw new HttpException({ message: 'Logging failed!!', status: HttpStatus.BAD_REQUEST }, HttpStatus.BAD_REQUEST);
    return 'Data logged successfully';
  };

  logDetails = async (logData: CreateLogDto, logPriority?: string) => {
    const loggerPriority = logPriority ? logPriority : 'low';
    if (loggerPriority && loggerPriority == LogPriority.HIGH)
      this.logDetailsInFile(logData); // Change after implementing server log
    else this.logDetailsInFile(logData);
    return 'Data logged successfully';
  };
}
