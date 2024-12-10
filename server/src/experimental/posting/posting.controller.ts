import express from 'express';
import ah from 'express-async-handler';
import joi from 'joi';

import { validateJoi } from 'middleware/validateJoi';
import { reply } from 'experimental/app-reply';
import { requireAuthenticated } from 'middleware/authMiddleware';
import { PostingFavouriteMarkModel } from 'db/models/favouriteMark';
import { JobApplicationModel } from 'db/models/jobApplication';

export const router = express.Router();

router.get(
  '/api/is-posting-applied/:postingId',
  requireAuthenticated(),
  ah(async (req, res) => {
    const { postingId } = req.params;
    const employeeId = req.user!._id;

    const existingAppl = await JobApplicationModel.findOne({
      employeeId,
      postingId,
    });

    const applied = Boolean(existingAppl);
    return reply(res, { applied });
  }),
);
