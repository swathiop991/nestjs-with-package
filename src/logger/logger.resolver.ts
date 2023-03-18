import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { LoggerServiceAbstract } from './abstracts/logger-service.abstract';
import { CreateLogDto } from './dtos/log.dto';

@Resolver()
export class LoggerResolver {
  constructor(private readonly loggerServiceAbstract: LoggerServiceAbstract) {}

  @Mutation(() => String)
  async logDetailsInFile(@Args('payload') body: CreateLogDto) {
    const logMessage = await this.loggerServiceAbstract.logDetailsInFile(body);
    return logMessage;
  }
}
