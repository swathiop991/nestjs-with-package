import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class VehicleOwnerRepositoryServiceAbstract<T> {
  abstract getAll(): Promise<T[]>;

  abstract getById(id: string): Promise<T | null>;

  abstract getByValue(field: string, value: string): Promise<T | null>;

  abstract create(item: T): Promise<T>;

  abstract update(filter: any, item: T): any;
}
