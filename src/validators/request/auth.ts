import { Request, Response, NextFunction } from 'express';

import { validate } from '../../utils/validator';
import { SignInSchema, SignUpSchema, NewTokenSchema } from './schema/auth';

export async function validateSignInSchema(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { body } = req;
    await validate(body, SignInSchema);
    next();
  } catch (error) {
    next(error);
  }
}

export async function validateSignUpSchema(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { body } = req;
    await validate(body, SignUpSchema);
    next();
  } catch (error) {
    next(error);
  }
}

export async function validateNewTokenSchema(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { body } = req;
    await validate(body, NewTokenSchema);
    next();
  } catch (error) {
    next(error);
  }
}
