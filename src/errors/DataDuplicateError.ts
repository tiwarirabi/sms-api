import CustomError from './CustomError';

/**
 * Data duplicate error class to handle data duplicate db errors.
 */
class DataDuplicateError extends CustomError {
  constructor(message: string, details?: {}, code?: number) {
    super(message);
    this.details = details;
    this.message = message;
    this.code = 409;
    Object.setPrototypeOf(this, DataDuplicateError.prototype);
  }
}

export default DataDuplicateError;
