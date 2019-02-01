import CustomError from './CustomError';

/**
 * Token error class to handle token errors.
 */
class TokenError extends CustomError {
  constructor(message: string, details?: string, code?: number) {
    super(message);
    this.details = details;
    this.code = code;
    Object.setPrototypeOf(this, TokenError.prototype);
  }
}

export default TokenError;
