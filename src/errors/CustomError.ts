/**
 * Generic class for error that will be extended by other errors.
 */
class CustomError extends Error {
  constructor(
    message: string,
    public details?: string | {},
    public code?: number
  ) {
    super(message);
    this.details = details;
    this.code = code;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export default CustomError;
