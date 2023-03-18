import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateVehicleOwnerNameDto {
  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  firstName: string;

  @IsString()
  @Field(() => String)
  middleName: string;

  @IsString()
  @Field(() => String)
  lastName: string;
}

@InputType()
export class CreateVehicleOwnerAddressDto {
  @IsString()
  @Field(() => String)
  address1: string;

  @IsString()
  @Field(() => String)
  address2: string;

  @IsString()
  @Field(() => String)
  addressBuilding: string;

  @IsString()
  @Field(() => String)
  addressStreet: string;

  @IsString()
  @Field(() => String)
  addressPlace: string;

  @IsString()
  @Field(() => String)
  addressCity: string;

  @IsString()
  @Field(() => String)
  addressState: string;

  @IsString()
  @Field(() => String)
  addressCountry: string;

  @IsString()
  @Field(() => String)
  addressPincode: string;

  @Field(() => Number)
  addressLat: number;

  @Field(() => Number)
  addressLong: number;
}

@InputType()
export class CreateVehicleOwnerDto {
  @IsNotEmpty()
  @Field(() => String)
  roleId: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  ownerPublicId?: string;

  @ValidateNested()
  @Field(() => CreateVehicleOwnerNameDto)
  name: CreateVehicleOwnerNameDto;

  @IsNotEmpty()
  @Field(() => Date)
  dob: Date;

  @IsString()
  @Field(() => String)
  photo: string; // url to the path of image

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  password: string;

  @Field(() => Date, { nullable: true })
  passwordGenOn?: Date;

  @IsEmail()
  @IsNotEmpty()
  @Field(() => String)
  email: string;

  @Field(() => Number)
  @IsNotEmpty()
  phoneNumber: number;

  @Field(() => Date)
  doj: Date;

  @IsBoolean()
  @Field(() => Boolean)
  isBussiness: boolean;

  @IsString()
  @Field(() => String)
  businessName: string;

  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  isActive?: boolean;

  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  isVerified?: boolean;

  @IsString()
  @Field(() => String)
  pan: string;

  @IsString()
  @Field(() => String)
  panDocPath: string;

  @ValidateNested()
  @Field(() => CreateVehicleOwnerAddressDto)
  address: CreateVehicleOwnerAddressDto;

  @IsOptional()
  @Field(() => Date, { nullable: true })
  createdOn?: Date;

  @IsOptional()
  @Field(() => Date, { nullable: true })
  lastUpdatedOn?: Date;
}
