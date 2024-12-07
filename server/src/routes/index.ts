import express from 'express';

import { router as userRouter } from './userRoutes';
import { router as jobRouter } from './jobRoutes';

export function createRootRouter() {
  const router = express.Router();

  router.use(userRouter);
  router.use(jobRouter);

  return router;
}
