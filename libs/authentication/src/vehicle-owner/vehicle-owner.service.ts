import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { VehicleOwnerServiceAbstract } from './abstracts/vehicle-owner-service.abstract';
import { VehicleOwnerRepositoryServiceAbstract } from './abstracts/vehicle-owner-repository-service.abstract';
import { CreateVehicleOwnerDto, UpdateVehicleOwnerDto } from '@app/authentication';
import { VehicleOwner } from './models/vehicle-owner.model';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { LoginDto } from './dtos/login.dto';
import { AuthenticationServiceAbstract } from '../shared/abstracts/authentication-service.abstract';
import { JwtPayloadData } from './types/jwt-payload';
const dot = require('dot-object');

@Injectable()
export class VehicleOwnerService implements VehicleOwnerServiceAbstract<VehicleOwner> {
  constructor(
    private readonly vehicleOwnerRepositoryServiceAbstract: VehicleOwnerRepositoryServiceAbstract<VehicleOwner>,
    private readonly sharedAuthenticationService: AuthenticationServiceAbstract,
  ) {}

  addVehicleOwnerDetails = async (vehicleOwnerData: CreateVehicleOwnerDto) => {
    const { email } = vehicleOwnerData;
    let vehicleOwnerResData = await this.vehicleOwnerRepositoryServiceAbstract.getByValue('email', email);
    if (vehicleOwnerResData) {
      throw new HttpException(
        { message: 'Vehicle Owner already exists!!', status: HttpStatus.BAD_REQUEST },
        HttpStatus.BAD_REQUEST,
      );
    }
    vehicleOwnerResData = await this.registerOwner(vehicleOwnerData);
    return vehicleOwnerResData;
  };

  registerOwner = async (vehicleOwnerData: CreateVehicleOwnerDto) => {
    vehicleOwnerData.ownerPublicId = uuidv4();
    vehicleOwnerData.password = await this.sharedAuthenticationService.hashPassword(vehicleOwnerData.password);
    vehicleOwnerData.passwordGenOn = new Date(Date.now());
    vehicleOwnerData.createdOn = new Date(Date.now());
    vehicleOwnerData.lastUpdatedOn = new Date(Date.now());

    const registeredOwnerData = await this.vehicleOwnerRepositoryServiceAbstract.create(vehicleOwnerData);
    return registeredOwnerData;
  };

  updateVehicleOwnerDetails = async (vehicleOwnerData: UpdateVehicleOwnerDto) => {
    const dotifiedvehicleOwnerData = dot.dot(vehicleOwnerData);
    const filter = { _id: new mongoose.Types.ObjectId(vehicleOwnerData._id) };
    const vehicleOwnerResData = await this.vehicleOwnerRepositoryServiceAbstract.update(
      filter,
      dotifiedvehicleOwnerData,
    );
    if (!vehicleOwnerResData) {
      throw new HttpException(
        { message: 'Vehicle Owner does not exists!!', status: HttpStatus.BAD_REQUEST },
        HttpStatus.BAD_REQUEST,
      );
    }
    return vehicleOwnerResData;
  };

  getVehicleOwnersList = async () => {
    const vehicleOwners = await this.vehicleOwnerRepositoryServiceAbstract.getAll();
    if (!vehicleOwners) {
      throw new HttpException(
        { message: 'Vehicle owner list empty', status: HttpStatus.NOT_FOUND },
        HttpStatus.NOT_FOUND,
      );
    }
    return vehicleOwners;
  };

  getVehicleOwnerById = async (id: string) => {
    const vehicleOwnerData = await this.vehicleOwnerRepositoryServiceAbstract.getById(id);
    if (!vehicleOwnerData) {
      throw new HttpException(
        { message: 'Vehicle owner not found', status: HttpStatus.NOT_FOUND },
        HttpStatus.NOT_FOUND,
      );
    }
    return vehicleOwnerData;
  };

  disableVehicleOwnerById = async (id: string) => {
    const filter = { _id: new mongoose.Types.ObjectId(id) };
    return this.vehicleOwnerRepositoryServiceAbstract.update(filter, { isActive: false, isVerified: false });
  };

  loginVehicleOwner = async (userData: LoginDto) => {
    const { email, password } = userData;
    const userResData = await this.vehicleOwnerRepositoryServiceAbstract.getByValue('email', email);
    if (!userResData) {
      throw new HttpException(
        { message: 'Vehicle Owner registration not found!!', status: HttpStatus.BAD_REQUEST },
        HttpStatus.BAD_REQUEST,
      );
    }
    const passwordMatchStatus = await this.sharedAuthenticationService.comparePassword(password, userResData.password);
    if (!passwordMatchStatus) {
      throw new HttpException(
        { message: 'Password mismatch!!', status: HttpStatus.BAD_REQUEST },
        HttpStatus.BAD_REQUEST,
      );
    }
    const vehicleOwnerLoginResData = await this.registerLogin(userResData);
    return vehicleOwnerLoginResData;
  };

  registerLogin = async (userResData: VehicleOwner) => {
    const jwtVersion = await this.sharedAuthenticationService.versionCheck(userResData._id);
    const payload: JwtPayloadData = {
      _id: userResData._id,
      ownerPublicId: userResData.ownerPublicId,
      email: userResData.email,
      roleId: userResData.roleId,
      version: jwtVersion.version,
    };
    const accessToken = await this.sharedAuthenticationService.generateJWT(payload, 'accessToken');
    const refreshToken = await this.sharedAuthenticationService.generateJWT(payload, 'refreshToken');
    return { accessToken, refreshToken };
  };
}
