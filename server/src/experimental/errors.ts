export class ApplicationError extends Error {
  public readonly userMessage: string;
  public readonly statusCode: number;
  constructor(msg: string, statusCode?: number) {
    super(msg);
    this.userMessage = msg;
    this.statusCode = statusCode || 400;
  }
}

export class NotFound extends ApplicationError {
  constructor() {
    super('Resource not found', 404);
  }
}
