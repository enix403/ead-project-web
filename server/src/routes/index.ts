import express from 'express';

import { router as userRouter } from './userRoutes';
import { router as jobRouter } from './jobRoutes';
import { router as statRouter } from './statRoutes';

import { router as authRouter } from 'controllers/core/auth/auth.controller';
import { router as healthRouter } from 'controllers/core/health.controller';
import { router as communityRouter } from 'controllers/core/community/community.controller';
import { router as meRouter } from 'controllers/core/me/me.controller';
import { router as postingRouter } from 'controllers/core/posting/posting.controller';
import { router as uploadingRouter } from 'controllers/core/uploading/uploading.controller';
import { router as chatRouter } from 'controllers/core/chat/chat.controller';

export function createRootRouter() {
  const router = express.Router();

  router.use(chatRouter);
  router.use(authRouter);
  router.use(healthRouter);
  router.use(communityRouter);
  router.use(meRouter);
  router.use(postingRouter);
  router.use(uploadingRouter);

  router.use(userRouter);
  router.use(jobRouter);
  router.use(statRouter);
  

  return router;
}
