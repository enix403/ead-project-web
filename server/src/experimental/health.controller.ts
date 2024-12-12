import express from 'express';
import ah from 'express-async-handler';
import { reply } from 'experimental/app-reply';
import { JobApplicationModel } from 'db/models/jobApplication';
import { JobInvitationModel } from 'db/models/jobInvitation';
import { ChatMessageModel, ConversationModel } from 'db/models/chat';

export const router = express.Router();

router.get(
  '/api/health',
  ah(async (req, res) => {
    return reply(res, {
      live: true,
      query: req.query
    });
  }),
);

router.post(
  '/api/temp',
  ah(async (req, res) => {
    // await JobApplicationModel.deleteMany({});
    // await JobInvitationModel.deleteMany({});
    await ConversationModel.deleteMany({});
    await ChatMessageModel.deleteMany({});

    return reply(res, { success: true });
  }),
);
