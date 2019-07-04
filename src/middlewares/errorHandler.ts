import * as HttpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';

import { buildError } from '../utils/error';

// import AuthError from '../errors/AuthError';

/**
 * Error response middleware for custom error.
 *
 * @param {Request} req
 * @param {Response} res
 */
export function customError(req: Request, res: Response) {
  res.status(HttpStatus.UNAUTHORIZED).json({
    error: {
      code: HttpStatus.UNAUTHORIZED,
      message: HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED)
    }
  });
}

/**
 * Error response middleware for 404 not found.
 *
 * @param {Request} req
 * @param {Response} res
 */
export function notFound(req: Request, res: Response) {
  res.status(HttpStatus.NOT_FOUND).json({
    error: {
      code: HttpStatus.NOT_FOUND,
      message: HttpStatus.getStatusText(HttpStatus.NOT_FOUND)
    }
  });
}

/**
 * Method not allowed error middleware. This middleware should be placed at
 * the very bottom of the middleware stack.
 *
 * @param {Request} req
 * @param {Response} res
 */
export function methodNotAllowed(req: Request, res: Response) {
  res.status(HttpStatus.METHOD_NOT_ALLOWED).json({
    error: {
      code: HttpStatus.METHOD_NOT_ALLOWED,
      message: HttpStatus.getStatusText(HttpStatus.METHOD_NOT_ALLOWED)
    }
  });
}

/**
 * To handle errors from body parser for cases such as invalid JSON sent through
 * the body.
 *
 * Read more : (https://github.com/expressjs/body-parser#errors).
 *
 * @param  {Error}   err
 * @param  {Request}   req
 * @param  {Response}   res
 * @param  {NextFunction} next
 */
export function bodyParser(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {

  res.status(err.status).json({
    error: {
      code: err.status,
      message: HttpStatus.getStatusText(err.status)
    }
  });
}

/**
 * Generic error response middleware for validation and internal server errors.
 *
 * @param  {Object}   err
 * @param  {Request}   req
 * @param  {Response}   res
 * @param  {NextFunction} next
 */
export function genericErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {

  const error = buildError(err);
  //TODO: mail the admin on any error's with the error details.
  
  res.status(error.code).json({ error });
}
