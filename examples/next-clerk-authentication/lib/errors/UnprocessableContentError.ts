import { HttpError } from './HttpError';

export class UnprocessableContentError extends HttpError {
  code = 422;

  constructor(message?: string) {
    super(message || 'Unprocessable content');

    this.name = 'UnprocessableContentError';
  }
}
