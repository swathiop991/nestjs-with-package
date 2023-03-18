import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtServiceAbstract } from './abstracts/jwt-service.abstract';
import { JwtVersion } from './models/jwt-version.model';
import { JwtPayloadData } from '../vehicle-owner/types/jwt-payload';
import { AuthenticationServiceAbstract } from './abstracts/authentication-service.abstract';
const argon2 = require('argon2');

@Injectable()
export class AuthenticationService implements AuthenticationServiceAbstract {
  constructor(
    private readonly jwtServiceAbstract: JwtServiceAbstract<JwtVersion>,
    private configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  hashPassword = async (password: string) => argon2.hash(password, 10);

  comparePassword = async (password: string, hashedPassword: string) => {
    const comparedPasswordStatus: boolean = await argon2.verify(hashedPassword, password);
    return comparedPasswordStatus;
  };

  versionCheck = async (userId: string): Promise<JwtVersion> => {
    const version = await this.jwtServiceAbstract.getByValue('userId', userId);
    if (!version) {
      const data = { userId, version: 1 };
      return this.jwtServiceAbstract.create(data);
    }
    return version;
  };

  generateJWT = async (jwtData: JwtPayloadData, tokenType: string) => {
    const options: JwtSignOptions = {
      secret: this.configService.get<string>('token.jwtSecret'),
    };
    if (tokenType == 'accessToken') {
      options.expiresIn = this.configService.get<string>('token.accessTokenExpire');
      jwtData.tokenType = 'accessToken';
    } else if (tokenType == 'refreshToken') {
      options.expiresIn = this.configService.get<string>('token.refreshTokenExpire');
      jwtData.tokenType = 'refreshToken';
    }
    const token = await this.jwtService.signAsync(jwtData, options);
    return token;
  };
}
