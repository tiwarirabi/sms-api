import CustomError from './CustomError';

/**
 * Autherror class to handle auth errors.
 */
class AuthError extends CustomError {
  /**
   * Contructor of AuthError.
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

export default AuthError;
