import express from 'express';
import ah from 'express-async-handler';
import joi from 'joi';

import { UserModel } from 'db/models/user';
import { validateJoi } from 'middleware/validateJoi';
import { reply } from 'experimental/app-reply';
import { requireAuthenticated } from 'middleware/authMiddleware';
import { ApplicationError, NotFound } from 'experimental/errors';
import { FriendshipModel } from 'db/models/friendship';

export const router = express.Router();

router.get(
  '/api/community',
  requireAuthenticated(),
  validateJoi(
    joi.object({
      searchTerm: joi.string().allow(''),
      location: joi.string(),
      jobType: joi.string(),
      userType: joi.string().valid('employee', 'individual', 'business'),
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

/* ==================== */

router.post(
  '/api/add-friend',
  requireAuthenticated(),
  validateJoi(
    joi.object({
      userId: joi.string().required(),
      checkOnly: joi.boolean(),
    }),
  ),
  ah(async (req, res) => {
    const userIdA = req.user!._id;
    const { userId: userIdB } = req.body;
    const { checkOnly } = req.query;

    let isFriend = false;

    {
      const secondUser = await UserModel.findById(userIdB);
      if (!secondUser) {
        throw new NotFound();
      }

      const existing = await FriendshipModel.findOne({
        $or: [
          { firstUserId: userIdA, secondUserId: userIdB },
          { firstUserId: userIdB, secondUserId: userIdA },
        ],
      });

      if (existing) {
        isFriend = true;
        if (!checkOnly)
          throw new ApplicationError(
            'This user is already added as friend',
            400,
            'already_added',
          );
      }
    }

    if (checkOnly) {
      return reply(res, { isFriend });
    }

    const friendship = new FriendshipModel({
      firstUserId: userIdA,
      secondUserId: userIdB,
    });

    await friendship.save();

    return reply.msg(res, 'Added friend');
  }),
);

router.delete(
  '/api/remove-friend',
  requireAuthenticated(),
  validateJoi(
    joi.object({
      userId: joi.string().required(),
    }),
  ),
  ah(async (req, res) => {
    const userIdA = req.user!._id;
    const { userId: userIdB } = req.body;

    FriendshipModel.deleteMany({
      $or: [
        { firstUserId: userIdA, secondUserId: userIdB },
        { firstUserId: userIdB, secondUserId: userIdA },
      ],
    });

    return reply.msg(res, 'Removed friend');
  }),
);
