export class HttpError extends Error {
  code = 0;

  constructor(message?: string) {
    super(message);
  }
}
