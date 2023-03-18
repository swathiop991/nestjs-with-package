import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { VehicleOwnerRepositoryServiceAbstract } from './abstracts/vehicle-owner-repository-service.abstract';
import { VehicleOwner, VehicleOwnerDocument } from './models/vehicle-owner.model';

@Injectable()
export class VehicleOwnerMongoService implements VehicleOwnerRepositoryServiceAbstract<VehicleOwner> {
  constructor(
    @InjectModel(VehicleOwner.name)
    private vehicleOwnerModel: mongoose.Model<VehicleOwnerDocument>,
  ) {}

  getAll(): Promise<VehicleOwner[]> {
    return this.vehicleOwnerModel.find().exec();
  }

  getById(id: string): Promise<VehicleOwner | null> {
    return this.vehicleOwnerModel.findById(id).exec();
  }

  getByValue(field: string, value: string): Promise<VehicleOwner | null> {
    const query: any = {};
    query[field] = value;
    return this.vehicleOwnerModel.findOne(query).exec();
  }

  async create(item: VehicleOwner): Promise<VehicleOwner> {
    return this.vehicleOwnerModel.create(item);
  }

  update(filter: any, item: VehicleOwner) {
    return this.vehicleOwnerModel.findOneAndUpdate(filter, item, { new: true });
  }
}
