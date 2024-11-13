import { HttpError } from './HttpError';

export class MethodNotAllowedError extends HttpError {
  code = 405;

  constructor(message?: string) {
    super(message || 'Method not allowed');

    this.name = 'MethodNotAllowedError';
  }
}
