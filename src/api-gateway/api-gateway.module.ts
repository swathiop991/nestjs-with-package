import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from '@shared/strategies/jwt-strategy';
import { GqlAuthGuard } from '@shared/guards/gql-auth-guard';
import { RolesGuard } from '@shared/guards/roles-guard';
import { AuthenticationModule } from '@app/authentication';
import { VehicleOwnerResolver } from './authentication/vehicle-owner/vehicle-owner.resolver';
@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('token.jwtSecret'),
      }),
    }),
    AuthenticationModule,
  ],
  providers: [VehicleOwnerResolver, JwtStrategy, GqlAuthGuard, RolesGuard],
})
export class ApiGatewayModule {}
