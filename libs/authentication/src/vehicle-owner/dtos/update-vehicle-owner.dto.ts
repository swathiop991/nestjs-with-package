import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateVehicleOwnerNameDto {
  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  firstName?: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  middleName?: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  lastName?: string;
}

@InputType()
export class UpdateVehicleOwnerAddressDto {
  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  address1?: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  address2?: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  addressBuilding?: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  addressStreet?: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  addressPlace?: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  addressCity?: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  addressState?: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  addressCountry?: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  addressPincode?: string;

  @IsOptional()
  @Field(() => Number, { nullable: true })
  addressLat?: number;

  @IsOptional()
  @Field(() => Number, { nullable: true })
  addressLong?: number;
}

@InputType()
export class UpdateVehicleOwnerDto {
  @IsNotEmpty()
  @Field(() => String)
  _id: string;

  @IsOptional()
  @Field(() => String, { nullable: true })
  roleId?: string;

  @ValidateNested()
  @IsOptional()
  @Field(() => UpdateVehicleOwnerNameDto, { nullable: true })
  name?: UpdateVehicleOwnerNameDto;

  @IsOptional()
  @Field(() => Date, { nullable: true })
  dob?: Date;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  photo?: string; // url to the path of image

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  password?: string;

  @IsOptional()
  @Field(() => Date, { nullable: true })
  passwordGenOn?: Date;

  @IsEmail()
  @IsOptional()
  @Field(() => String, { nullable: true })
  email?: string;

  @IsOptional()
  @Field(() => Number, { nullable: true })
  phoneNumber?: number;

  @IsOptional()
  @Field(() => Date, { nullable: true })
  doj?: Date;

  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  isBussiness?: boolean;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  businessName?: string;

  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  isActive?: boolean;

  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  isVerified?: boolean;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  pan?: string;

  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  panDocPath?: string;

  @ValidateNested()
  @IsOptional()
  @Field(() => UpdateVehicleOwnerAddressDto, { nullable: true })
  address?: UpdateVehicleOwnerAddressDto;

  @IsOptional()
  @Field(() => Date, { nullable: true })
  createdOn?: Date;

  @IsOptional()
  @Field(() => Date, { nullable: true })
  lastUpdatedOn?: Date;
}
