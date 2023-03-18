import { Injectable } from '@nestjs/common';
import { CreateLogDto } from '../dtos/log.dto';

@Injectable()
export abstract class LoggerFrameworkAbstract {
  abstract logInFile(logdata: CreateLogDto): boolean;
}
