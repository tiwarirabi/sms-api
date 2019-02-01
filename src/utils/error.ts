import * as HttpStatus from 'http-status-codes';
import CustomError from '../errors/CustomError';

interface MyError {
  code: number;
  message: string;
  details?: string[] | string;
}

/**
 * Build error response for validation errors.
 *
 * @param  {error} err
 * @return {array|object}
 */
export function buildError(err: any): MyError {
  // Validation errors
  if (err.isJoi || err instanceof SyntaxError) {
    const errorPayload = {
      code: HttpStatus.BAD_REQUEST,
      message: HttpStatus.getStatusText(HttpStatus.BAD_REQUEST),
      details:
        err.details &&
        err.details.map((error: any) => {
          return {
            message: error.message,
            param: error.path
          };
        })
    };

    return errorPayload as MyError;
  }

  // Custome Errors
  if (err instanceof CustomError) {
    const errorPayload = {
      code: err.code,
      message: err.message,
      details: err.details
    };

    return errorPayload as MyError;
  }

  // Other Errors

  return {
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    message: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
  };
}
