import CustomError from './CustomError';

/**
 * Autherror class to handle auth errors.
 */
class AuthError extends CustomError {
  constructor(message: string, details?: string, code?: number) {
    super(message);
    this.details = details;
    this.message = message;
    this.code = 401;
    Object.setPrototypeOf(this, AuthError.prototype);
  }
}

export default AuthError;
