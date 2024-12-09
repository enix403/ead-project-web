import express from 'express';
import ah from 'express-async-handler';
import joi from 'joi';

import { UserModel } from 'db/models/user';
import { validateJoi } from 'middleware/validateJoi';
import { reply } from 'experimental/app-reply';
import { requireAuthenticated } from 'middleware/authMiddleware';

export const router = express.Router();

router.get(
  '/api/community',
  requireAuthenticated(),
  validateJoi(
    joi.object({
      searchTerm: joi.string().allow(''),
      location: joi.string(),
      jobType: joi.string(),
      userType: joi.string().valid('individual', 'business'),
    }),
  ),
  ah(async (req, res) => {
    const { searchTerm, location, jobType, userType } = req.query;

    const users = await UserModel.find({
      _id: { $ne: req.user!._id },
    });

    return reply(res, users);
  }),
);
