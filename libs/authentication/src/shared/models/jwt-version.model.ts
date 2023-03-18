import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class JwtVersion {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'VehicleOwner' })
  userId: string;

  @Prop()
  version: number;
}

export type JwtVersionDocument = JwtVersion & mongoose.Document;
export const JwtVersionSchema = SchemaFactory.createForClass(JwtVersion);
