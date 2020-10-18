const { BAD_REQUEST, NOT_FOUND } = require('http-status-codes');

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.status = BAD_REQUEST;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.status = NOT_FOUND;
  }
}

module.exports = { ValidationError, NotFoundError };
