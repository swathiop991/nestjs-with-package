export interface JwtPayloadData {
  _id?: string;

  ownerPublicId?: string;

  email?: string;

  roleId?: string;

  version?: number;

  tokenType?: string;
}
