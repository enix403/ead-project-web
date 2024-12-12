import express from 'express';
import ah from 'express-async-handler';

import { reply } from 'controllers/core/app-reply';
import { requireAuthenticated } from 'middleware/authMiddleware';
import { UserModel } from 'db/models/user';
import { FriendshipModel } from 'db/models/friendship';

export const router = express.Router();

router.get(
  '/api/me',
  requireAuthenticated(),
  ah(async (req, res) => {
    const user = await UserModel.findById(req.user!._id)
      .populate('friendsWith')
      .populate('friendsOf');

    // const fs = await FriendshipModel.find({});

    // return reply(res, fs);
    return reply(res, user);
  }),
);
