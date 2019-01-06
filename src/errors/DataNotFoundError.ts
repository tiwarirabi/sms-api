import CustomError from './CustomError';

/**
 * Data not found error class to handle not found db errors.
 */
class DataNotFoundError extends CustomError {
  /**
   * Contructor of DataNotFoundError.
   *
   * @param {String} message
   * @param {String} details
   */
  constructor(message: string, details?: string) {
    super(message);
    this.details = details;
    this.stack = details;
  }
}

export default DataNotFoundError;
