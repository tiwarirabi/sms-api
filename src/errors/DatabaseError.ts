import CustomError from '../errors/CustomError';

/**
 * Database error class to handle database errors.
 */
class DatabaseError extends CustomError {
  constructor(message: string, details?: string, code?: number) {
    super(message);
    this.details = details || '';
    this.message = message || 'Database Error';
    this.code = 400;
    Object.setPrototypeOf(this, DatabaseError.prototype);
  }
}

export default DatabaseError;
