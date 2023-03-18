import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType()
export class VehicleOwnerName {
  @Field(() => String)
  @Prop()
  firstName?: string;

  @Field(() => String)
  @Prop()
  middleName?: string;

  @Field(() => String)
  @Prop()
  lastName?: string;
}

@ObjectType()
@Schema()
export class VehicleOwnerAddressInfo {
  @Field(() => String)
  @Prop()
  address1?: string;

  @Field(() => String)
  @Prop()
  address2?: string;

  @Field(() => String)
  @Prop()
  addressBuilding?: string;

  @Field(() => String)
  @Prop()
  addressStreet?: string;

  @Field(() => String)
  @Prop()
  addressPlace?: string;

  @Field(() => String)
  @Prop()
  addressCity?: string;

  @Field(() => String)
  @Prop()
  addressState?: string;

  @Field(() => String)
  @Prop()
  addressCountry?: string;

  @Field(() => String)
  @Prop()
  addressPincode?: string;

  @Field(() => Number)
  @Prop()
  addressLat?: number;

  @Field(() => Number)
  @Prop()
  addressLong?: number;
}

@ObjectType()
@Schema()
export class VehicleOwner {
  @Field(() => ID, { nullable: true })
  _id?: string;

  @Field(() => String)
  @Prop()
  roleId?: string;

  @Field(() => String)
  @Prop({ unique: true })
  ownerPublicId?: string;

  @Field(() => VehicleOwnerName)
  @Prop({ ref: () => VehicleOwnerName })
  name?: VehicleOwnerName;

  @Field(() => Date)
  @Prop()
  dob?: Date;

  @Field(() => String)
  @Prop()
  photo?: string; // url to the path of image

  @Field(() => String)
  @Prop()
  password?: string;

  @Field(() => Date)
  @Prop()
  passwordGenOn?: Date;

  @Field(() => String)
  @Prop()
  email?: string;

  @Field(() => Number)
  @Prop()
  phoneNumber?: number;

  @Field(() => Date)
  @Prop()
  doj?: Date;

  @Field(() => Boolean)
  @Prop()
  isBussiness?: boolean;

  @Field(() => String)
  @Prop()
  businessName?: string;

  @Field(() => Boolean)
  @Prop({ default: false })
  isActive?: boolean;

  @Field(() => Boolean)
  @Prop({ default: false })
  isVerified?: boolean;

  @Field(() => String)
  @Prop()
  pan?: string;

  @Field(() => String)
  @Prop()
  panDocPath?: string;

  @Field(() => VehicleOwnerAddressInfo)
  @Prop({ ref: () => VehicleOwnerAddressInfo })
  address?: VehicleOwnerAddressInfo;

  @Field(() => Date, { nullable: true })
  @Prop()
  createdOn?: Date;

  @Field(() => Date, { nullable: true })
  @Prop()
  lastUpdatedOn?: Date;
}

export const VehicleOwnerSchema = SchemaFactory.createForClass(VehicleOwner);
export type VehicleOwnerDocument = VehicleOwner & Document;
