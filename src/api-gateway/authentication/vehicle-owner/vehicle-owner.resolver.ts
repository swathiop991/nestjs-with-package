import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
// import { UseGuards } from '@nestjs/common';
// import { UserRoles } from '@shared/constants';
// import { GqlAuthGuard } from '@shared/guards/gql-auth-guard';
// import { RolesGuard } from '@shared/guards/roles-guard';
import { VehicleOwnerServiceAbstract } from '@app/authentication';
import { AuthenticationServiceAbstract } from '@app/authentication';
import { VehicleOwner } from '@app/authentication';
import { JwtTokenModel } from '@app/authentication';
import { LoginDto } from '@app/authentication';
import { CreateVehicleOwnerDto, UpdateVehicleOwnerDto } from '@app/authentication';
// import { Roles } from './decorators/roles.decorator';

@Resolver()
export class VehicleOwnerResolver {
  constructor(
    private readonly vehicleOwnerServiceAbstract: VehicleOwnerServiceAbstract<VehicleOwner>,
    private readonly authenticationServiceAbstract: AuthenticationServiceAbstract,
  ) {}

  //@Roles(UserRoles.ADMIN, UserRoles.SUPERADMIN)
  //@UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(() => VehicleOwner)
  async addVehicleOwnerDetails(@Args('payload') body: CreateVehicleOwnerDto) {
    const vehicleOwnerInfo = await this.vehicleOwnerServiceAbstract.addVehicleOwnerDetails(body);
    return vehicleOwnerInfo;
  }

  @Mutation(() => VehicleOwner)
  async editVehicleOwnerDetails(@Args('payload') body: UpdateVehicleOwnerDto) {
    const vehicleOwnerInfo = await this.vehicleOwnerServiceAbstract.updateVehicleOwnerDetails(body);
    return vehicleOwnerInfo;
  }

  @Query(() => [VehicleOwner])
  async getVehicleOwnersList() {
    const vehicleOwnersInfo = await this.vehicleOwnerServiceAbstract.getVehicleOwnersList();
    return vehicleOwnersInfo;
  }

  @Query(() => VehicleOwner)
  async getVehicleOwnerById(@Args('vehicleOwnerId') vehicleOwnerId: string) {
    const vehicleOwnerInfo = await this.vehicleOwnerServiceAbstract.getVehicleOwnerById(vehicleOwnerId);
    return vehicleOwnerInfo;
  }

  @Mutation(() => VehicleOwner)
  async disableVehicleOwnerById(@Args('vehicleOwnerId') vehicleOwnerId: string) {
    const vehicleOwnerInfo = await this.vehicleOwnerServiceAbstract.disableVehicleOwnerById(vehicleOwnerId);
    return vehicleOwnerInfo;
  }

  @Query(() => JwtTokenModel)
  async vehicleOwnerLogin(@Args('payload') body: LoginDto) {
    const loginData = await this.vehicleOwnerServiceAbstract.loginVehicleOwner(body);
    return loginData;
  }
}
