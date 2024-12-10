import express from 'express';
import ah from 'express-async-handler';
import { reply } from 'experimental/app-reply';
import { JobApplicationModel } from 'db/models/jobApplication';

export const router = express.Router();

router.get(
  '/api/health',
  ah(async (req, res) => {
    return reply(res, {
      live: true,
    });
  }),
);

router.post(
  '/api/temp',
  ah(async (req, res) => {
    await JobApplicationModel.deleteMany({});

    return reply(res, { success: true });
  }),
);
