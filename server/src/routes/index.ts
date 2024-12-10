import express from 'express';

import { router as userRouter } from './userRoutes';
import { router as jobRouter } from './jobRoutes';
import { router as statRouter } from './statRoutes';

import { router as authRouter } from 'experimental/auth/auth.controller';
import { router as healthRouter } from 'experimental/health.controller';
import { router as communityRouter } from 'experimental/community/community.controller';
import { router as meRouter } from 'experimental/me/me.controller';
import { router as postingRouter } from 'experimental/posting/posting.controller';

export function createRootRouter() {
  const router = express.Router();

  router.use(userRouter);
  router.use(jobRouter);
  router.use(statRouter);
  router.use(authRouter);
  router.use(healthRouter);
  router.use(communityRouter);
  router.use(meRouter);
  router.use(postingRouter);

  return router;
}
