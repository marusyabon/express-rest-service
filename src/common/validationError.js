const { BAD_REQUEST } = require('http-status-codes');

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.status = BAD_REQUEST;
  }
}

module.exports = ValidationError;
