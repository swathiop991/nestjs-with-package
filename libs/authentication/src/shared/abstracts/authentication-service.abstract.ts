import { Injectable } from '@nestjs/common';
import { JwtVersion } from '../models/jwt-version.model';

@Injectable()
export abstract class AuthenticationServiceAbstract {
  abstract hashPassword(item: string): Promise<string>;

  abstract comparePassword(item1: string, item2: string): Promise<boolean>;

  abstract versionCheck(item: string): Promise<JwtVersion>;

  abstract generateJWT(item1: object, item2: string): Promise<string>;
}
