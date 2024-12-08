import { Response } from 'express';

export function reply(res: Response, data?: any): void {
  res.status(200).json(data ?? "ok").end();
}
