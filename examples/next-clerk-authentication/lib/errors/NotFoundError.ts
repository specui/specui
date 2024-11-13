import { HttpError } from './HttpError';

export class NotFoundError extends HttpError {
  code = 404;

  constructor(message?: string) {
    super(message || 'Not found');

    this.name = 'NotFoundError';
  }
}
