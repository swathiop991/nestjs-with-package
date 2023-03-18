import { Injectable } from '@nestjs/common';
import { CreateLogDto } from '../dtos/log.dto';

@Injectable()
export abstract class LoggerServiceAbstract {
  abstract logDetails(logData: CreateLogDto, logPriority?: string): Promise<string>;
  abstract logDetailsInFile(logData: CreateLogDto): Promise<string>;
}
