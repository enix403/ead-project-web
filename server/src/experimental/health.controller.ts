import express from 'express';
import ah from 'express-async-handler';
import { reply } from 'experimental/app-reply';

export const router = express.Router();

router.get(
  '/api/health',
  ah(async (req, res) => {
    return reply(res, {
      live: true
    });
  }),
);
