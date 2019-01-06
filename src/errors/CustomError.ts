/**
 * Generic class for error that will be extended by other errors.
 */
class CustomError extends Error {
  constructor(message: string, public details?: string) {
    super(message);
    this.details = details;
  }
}

export default CustomError;
