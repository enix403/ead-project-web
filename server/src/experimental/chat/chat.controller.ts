import express from 'express';
import ah from 'express-async-handler';
import Joi from 'joi';

import { ChatMessageModel, ConversationModel } from 'db/models/chat';
import { customJoi, validateJoi } from 'middleware/validateJoi';
import { reply } from 'experimental/app-reply';
import { requireAuthenticated } from 'middleware/authMiddleware';

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

    let conversation = await ConversationModel.findOne({
      kind: 'single',
      participants: { $all: [userId, receiverId] },
    });

    let fresh = false;

    if (!conversation) {
      fresh = true;

      conversation = new ConversationModel({
        kind: 'single',
        participants: [userId, receiverId],
        creatorId: userId,
      });

      conversation = await conversation.save();
    }

    await conversation.populate({ path: 'participants' });
    const conversationId = conversation._id;

    const messages = await ChatMessageModel.find({
      conversationId,
    }).sort({ sentAt: 1 });

    return reply(res, {
      fresh,
      conversation,
      messages,
    });
  }),
);

export default router;
