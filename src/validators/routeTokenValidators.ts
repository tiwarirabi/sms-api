import { Response, NextFunction } from 'express';

import { AuthRequest } from '../domains/request/AuthRequest';

import { USER_TYPES } from '../constants/userTypes';
import AuthError from '../errors/AuthError';

export function userRouteValidator(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const { user: { type = null } = {} } = req;

  if (
    type &&
    (type === USER_TYPES.admin ||
      type === USER_TYPES.office ||
      type === USER_TYPES.employee)
  ) {
    return next();
  }

  next(new AuthError('Not Authorized.'));
}

export function employeeRouteValidator(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const { user: { type = null } = {} } = req;

  if (type && type === USER_TYPES.employee) {
    return next();
  }

  next(new AuthError('Not Authorized.'));
}

export function officeRouteValidator(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const { user: { type = null } = {} } = req;

  if (type && (type === USER_TYPES.office || type === USER_TYPES.admin)) {
    return next();
  }

  next(new AuthError('Not Authorized.'));
}

export function adminRouteValidator(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const { user: { type = null } = {} } = req;

  if (type && type === USER_TYPES.admin) {
    return next();
  }

  next(new AuthError('Not Authorized.'));
}
