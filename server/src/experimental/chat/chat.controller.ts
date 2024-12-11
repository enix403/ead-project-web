import express from 'express';
import ah from 'express-async-handler';
import joi from 'joi';

import { ChatMessageModel, ConversationModel } from 'db/models/chat';
import { customJoi, validateJoi } from 'middleware/validateJoi';
import { reply } from 'experimental/app-reply';
import { requireAuthenticated } from 'middleware/authMiddleware';

export const router = express.Router();

router.get(
  '/messages/:receiverId',
  requireAuthenticated(),
  validateJoi(
    joi.object({
      receiverId: customJoi.id(),
    }),
  ),
  ah(async (req, res) => {
    const { receiverId } = req.params;
    const userId = req.user!._id;

    const messages = await ChatMessageModel.find({
      $or: [
        { sender: userId, receiver: receiverId },
        { sender: receiverId, receiver: userId },
      ],
    }).sort({ sentAt: 1 });

    return reply(res, messages);
  }),
);

router.get(
  '/conversations',
  requireAuthenticated(),
  ah(async (req, res) => {
    try {
      const conversations = await ConversationModel.find({
        participants: req.user!._id,
      })
        .populate('participants')
        .sort({ lastUpdated: -1 });

      res.json(conversations);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching conversations' });
    }
  }),
);

router.post(
  '/start-conversation',
  requireAuthenticated(),
  validateJoi(
    joi.object({
      receiverId: customJoi.id(),
    }),
  ),
  ah(async (req, res) => {
    const userId = req.user!._id;
    const { receiverId } = req.body;

    let conversation = await ConversationModel.findOne({
      participants: { $all: [userId, receiverId] },
    });

    if (!conversation) {
      conversation = await ConversationModel.create({
        participants: [userId, receiverId],
      });
    }

    return reply(res, conversation);
  }),
);

export default router;
