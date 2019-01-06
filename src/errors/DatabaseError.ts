import CustomError from '../errors/CustomError';

/**
 * Database error class to handle database errors.
 */
class DatabaseError extends CustomError {
  /**
   * Contructor of DatabaseError.
   *
   * @param {String} message
   * @param {String} details
   */
  constructor(message: string, details: string) {
    super(message);
    this.details = details;
  }
}

export default DatabaseError;
