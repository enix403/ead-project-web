import express from 'express';
import ah from 'express-async-handler';
import joi from 'joi';

import { validateJoi } from 'middleware/validateJoi';
import { reply } from 'experimental/app-reply';
import { requireAuthenticated } from 'middleware/authMiddleware';
import { PostingFavouriteMarkModel } from 'db/models/favouriteMark';

export const router = express.Router();

router.patch(
  '/api/mark-posting-favourite',
  requireAuthenticated(),
  validateJoi(
    joi.object({
      postingId: joi.string().required(),
      isFavourite: joi.bool().required(),
    }),
  ),
  ah(async (req, res) => {
    const { postingId, isFavourite } = req.body;
    const userId = req.user!._id;

    if (isFavourite) {
      await PostingFavouriteMarkModel.findOneAndUpdate(
        { postingId, userId },
        { postingId, userId },
        { upsert: true },
      );
    } else {
      await PostingFavouriteMarkModel.deleteMany({ postingId, userId });
    }

    return reply(res, 'Marked successfully');
  }),
);
