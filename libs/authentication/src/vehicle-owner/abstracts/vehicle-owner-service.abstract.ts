import { Injectable } from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';
import { JwtTokenModel } from '../models/jwt-token.model';

@Injectable()
export abstract class VehicleOwnerServiceAbstract<T> {
  abstract addVehicleOwnerDetails(item: T): Promise<T>;

  abstract updateVehicleOwnerDetails(item: T): Promise<T>;

  abstract getVehicleOwnersList(): Promise<T[]>;

  abstract getVehicleOwnerById(id: string): Promise<T>;

  abstract disableVehicleOwnerById(id: string): Promise<T>;

  abstract loginVehicleOwner(item: LoginDto): Promise<JwtTokenModel>;
}
