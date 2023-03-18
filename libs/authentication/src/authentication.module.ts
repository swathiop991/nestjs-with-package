import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthenticationService } from './shared/authentication.service';
import { JwtVersion, JwtVersionSchema } from './shared/models/jwt-version.model';
import { JwtServiceAbstract } from './shared/abstracts/jwt-service.abstract';
import { JwtVersionMongoService } from './shared/jwt-mongo.service';
import { AuthenticationServiceAbstract } from './shared/abstracts/authentication-service.abstract';
import { VehicleOwner, VehicleOwnerSchema } from './vehicle-owner/models/vehicle-owner.model';
import { VehicleOwnerServiceAbstract } from './vehicle-owner/abstracts/vehicle-owner-service.abstract';
import { VehicleOwnerService } from './vehicle-owner/vehicle-owner.service';
import { VehicleOwnerRepositoryServiceAbstract } from './vehicle-owner/abstracts/vehicle-owner-repository-service.abstract';
import { VehicleOwnerMongoService } from './vehicle-owner/vehicle-owner-mongo.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('token.jwtSecret'),
      }),
    }),
    MongooseModule.forFeature([
      { name: JwtVersion.name, schema: JwtVersionSchema },
      { name: VehicleOwner.name, schema: VehicleOwnerSchema },
    ]),
  ],
  providers: [
    AuthenticationService,
    {
      provide: AuthenticationServiceAbstract,
      useClass: AuthenticationService,
    },
    {
      provide: JwtServiceAbstract,
      useClass: JwtVersionMongoService,
    },
    {
      provide: VehicleOwnerServiceAbstract,
      useClass: VehicleOwnerService,
    },
    {
      provide: VehicleOwnerRepositoryServiceAbstract,
      useClass: VehicleOwnerMongoService,
    },
  ],
  exports: [AuthenticationServiceAbstract, VehicleOwnerServiceAbstract],
})
export class AuthenticationModule {}
