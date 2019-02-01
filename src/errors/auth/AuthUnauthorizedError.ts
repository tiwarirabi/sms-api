import CustomError from '../CustomError';

/**
 * AuthUnauthorizedError class to handle auth unauthorixed errors.
 */
class AuthUnauthorizedError extends CustomError {
  constructor(message: string, details?: string, code?: number) {
    super(message);
    this.details = details;
    this.message = message;
    this.code = 401;
    Object.setPrototypeOf(this, AuthUnauthorizedError.prototype);
  }
}

export default AuthUnauthorizedError;
