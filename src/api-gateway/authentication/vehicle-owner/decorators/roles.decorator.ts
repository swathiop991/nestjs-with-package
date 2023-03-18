import { SetMetadata } from '@nestjs/common';
import { UserRoles } from '@shared/constants';

export const ROLESKEY = 'roles';
export const Roles = (...roles: UserRoles[]) => SetMetadata(ROLESKEY, roles);
