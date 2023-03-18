import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { JwtServiceAbstract } from './abstracts/jwt-service.abstract';
import { JwtVersion, JwtVersionDocument } from './models/jwt-version.model';
@Injectable()
export class JwtVersionMongoService implements JwtServiceAbstract<JwtVersion> {
  constructor(
    @InjectModel(JwtVersion.name)
    private jwtVersionModel: mongoose.Model<JwtVersionDocument>,
  ) {}

  getByValue(field: string, value: string): Promise<JwtVersion | null> {
    const query: any = {};
    query[field] = value;
    return this.jwtVersionModel.findOne(query).exec();
  }

  create(item: JwtVersionDocument): Promise<JwtVersionDocument> {
    return this.jwtVersionModel.create(item);
  }
}
