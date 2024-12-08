import { Response } from 'express';

export function reply(res: Response, data?: any): void {
  data = data ?? "ok";

  if (typeof data === 'string') {
    data = { message: data };
  }

  res.status(200).json(data).end();
}
