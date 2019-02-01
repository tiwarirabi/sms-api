import CustomError from '../CustomError';

/**
 * AuthForbiddenError class to handle auth forbidden errors.
 */
class AuthForbiddenError extends CustomError {
  constructor(message: string, details?: string, code?: number) {
    super(message);
    this.details = details;
    this.message = message;
    this.code = 403;
    Object.setPrototypeOf(this, AuthForbiddenError.prototype);
  }
}

export default AuthForbiddenError;
