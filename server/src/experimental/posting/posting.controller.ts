import express from 'express';
import ah from 'express-async-handler';
import joi from 'joi';

import { validateJoi } from 'middleware/validateJoi';
import { reply } from 'experimental/app-reply';
import { requireAuthenticated } from 'middleware/authMiddleware';
import { PostingFavouriteMarkModel } from 'db/models/favouriteMark';
import { JobApplicationModel } from 'db/models/jobApplication';
import { JobPostingModel } from 'db/models/jobPosting';
import { ApplicationError, NotFound } from 'experimental/errors';
import { UserModel } from 'db/models/user';
import { JobInvitationModel } from 'db/models/jobInvitation';

export const router = express.Router();

router.get(
  '/api/is-posting-applied/:postingId',
  requireAuthenticated(['employee']),
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

router.post(
  '/api/invite-employee',
  requireAuthenticated(['employer']),
  ah(async (req, res) => {
    const { employeeId, postingId } = req.body;
    const invitedByUserId = req.user!._id;

    {
      const posting = await JobPostingModel.findById(postingId);
      if (!posting) throw new NotFound();

      const employee = await UserModel.findById(employeeId);
      if (!employee) throw new NotFound();
    }

    const existing = await JobInvitationModel.findOne({
      employeeId,
      postingId,
    });

    if (existing) {
      throw new ApplicationError(
        'Already invited this applicant to this job',
        400,
        'already_invited',
      );
    }

    const invitation = new JobInvitationModel({
      postingId,
      employeeId,
      invitedByUserId,
      invitedAt: new Date(),
      status: 'waiting',
    });

    await invitation.save();

    return reply.msg(res, 'Invited successfully', { invitation });
  }),
);

router.post(
  '/api/is-employee-invited',
  requireAuthenticated(['employer']),
  validateJoi(
    joi.object({
      employeeId: joi.string().required(),
      postingId: joi.string().required(),
    }),
  ),
  ah(async (req, res) => {
    const { employeeId, postingId } = req.body;

    const existing = await JobInvitationModel.findOne({
      postingId,
      employeeId,
    });

    const invited = Boolean(existing);
    return reply(res, { invited });
  }),
);
