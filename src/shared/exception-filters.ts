import { Catch, HttpStatus, ExecutionContext } from '@nestjs/common';
import { GqlExceptionFilter, GqlExecutionContext } from '@nestjs/graphql';
import { LoggerService } from '../logger/logger.service';

@Catch()
export class AllExceptionFilter implements GqlExceptionFilter {
  constructor(private readonly loggerService: LoggerService) {}

  catch(exception: any, context: ExecutionContext) {
    let responseBody = {
      message: '',
      stack: '',
      status: '',
      methodName: '',
    };
    if (exception && exception.response && exception.response.object) {
      responseBody = exception.response.object;
    } else if (exception && exception.message && context) {
      responseBody.message = exception.message;
      responseBody.stack = exception.stack;
      responseBody.status = exception.status ? exception.status : HttpStatus.INTERNAL_SERVER_ERROR;
      const ctx = GqlExecutionContext.create(context);
      if (ctx && ctx.getInfo()) {
        const { fieldName } = ctx.getInfo();
        responseBody.methodName = fieldName || 'Unknown Method';
      }
    }
    // Log details
    this.loggerService.logDetails(responseBody);
    return exception;
  }
}
