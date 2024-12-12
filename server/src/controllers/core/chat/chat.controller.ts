import express from 'express';
import ah from 'express-async-handler';
import Joi from 'joi';

import { ChatMessageModel, ConversationModel } from 'db/models/chat';
import { customJoi, validateJoi } from 'middleware/validateJoi';
import { reply } from 'controllers/core/app-reply';
import { requireAuthenticated } from 'middleware/authMiddleware';
import { Types } from 'mongoose';

export const router = express.Router();

router.get(
  '/api/chat/conversations',
  requireAuthenticated(),
  ah(async (req, res) => {
    const conversations = await ConversationModel.find({
      participants: req.user!._id,
    })
      .populate({
        path: 'participants',
      })
      .sort({ lastUpdated: -1 });

    return reply(res, conversations);
  }),
);

router.post(
  '/api/chat/resume-conv-single',
  requireAuthenticated(),
  validateJoi(
    Joi.object({
      receiverId: customJoi.id(),
    }),
  ),
  ah(async (req, res) => {
    const userId = req.user!._id;
    const { receiverId } = req.body;

    // const insertParticipants = [userId, receiverId].sort();

    // ====
    const conversation = await ConversationModel.findOneAndUpdate(
      {
        kind: 'single',
        participants: {
          $all: [
            { $elemMatch: { $eq: new Types.ObjectId(userId) } },
            { $elemMatch: { $eq: new Types.ObjectId(receiverId as string) } },
          ],
        }, // Match condition
      },
      {
        $setOnInsert: {
          kind: 'single',
          participants: [userId, receiverId].sort(), // Ensure consistent order
          creatorId: userId,
        },
      },
      {
        new: true, // Return the updated or newly created document
        upsert: true, // Create the document if it doesn't exist
      },
    );

    await conversation.populate({ path: 'participants' });
    const conversationId = conversation._id;

    // ====

    const messages = await ChatMessageModel.find({
      conversationId,
    }).sort({ sentAt: 1 });

    return reply(res, {
      conversation,
      messages,
    });
  }),
);

export default router;
