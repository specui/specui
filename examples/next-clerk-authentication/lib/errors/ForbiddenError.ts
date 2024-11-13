import { HttpError } from './HttpError';

export class ForbiddenError extends HttpError {
  code = 403;

  constructor(message?: string) {
    super(message || 'Forbidden');

    this.name = 'ForbiddenError';
  }
}
