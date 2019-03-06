import CustomError from '../errors/CustomError';

/**
 * BadRequest error class to handle BadRequest errors.
 */
class BadRequestError extends CustomError {
  constructor(message: string, details?: string, code?: number) {
    super(message);
    this.details = details || '';
    this.message = message || 'BadRequest Error';
    this.code = 400;
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

export default BadRequestError;
