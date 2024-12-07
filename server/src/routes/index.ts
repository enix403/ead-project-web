import express from 'express';

import { router as userRouter } from './userRoutes';
import { router as jobRouter } from './jobRoutes';
import { router as statRouter } from './statRoutes';

export function createRootRouter() {
  const router = express.Router();

  router.use(userRouter);
  router.use(jobRouter);
  router.use(statRouter);

  return router;
}
