import { Request, Response, NextFunction } from 'express';

import Joi from 'joi';

export function validateJoi(schema: Joi.ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate({
      ...req.body,
      ...req.query,
      ...req.params,
    });
    if (error) {
      delete error['_original'];
      return res.status(400).json(error);
    }
    next();
  };
}
