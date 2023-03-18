import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class JwtServiceAbstract<T> {
  abstract getByValue(field: string, value: string): Promise<T | null>;

  abstract create(item: T): Promise<T>;
}
