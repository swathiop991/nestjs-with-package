import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType()
@Schema()
export class LoggerInfo {
  @Field(() => String)
  @Prop()
  message: string;

  @Field(() => String, { nullable: true })
  @Prop()
  stack?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  status?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  origin?: string;
}

export const LoggerSchema = SchemaFactory.createForClass(LoggerInfo);
export type LoggerDocument = LoggerInfo & Document;
