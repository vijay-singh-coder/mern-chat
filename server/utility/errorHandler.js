class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.success = false; // Add success = false
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = ErrorHandler;
