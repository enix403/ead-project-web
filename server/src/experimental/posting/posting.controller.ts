import express from 'express';
import ah from 'express-async-handler';
import joi from 'joi';

import { validateJoi } from 'middleware/validateJoi';
import { reply } from 'experimental/app-reply';
import { requireAuthenticated } from 'middleware/authMiddleware';
import { JobApplicationModel } from 'db/models/jobApplication';
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
  validateJoi(
    joi.object({
      employeeId: joi.string().required(),
    }),
  ),
  ah(async (req, res) => {
    const { employeeId } = req.body;
    const invitedByUserId = req.user!._id;

    {
      const employee = await UserModel.findById(employeeId);
      if (!employee) throw new NotFound();
    }

    const existing = await JobInvitationModel.findOne({
      employeeId,
      invitedByUserId
    });

    if (existing) {
      throw new ApplicationError(
        'Already invited this candidate to this job',
        400,
        'already_invited',
      );
    }

    const invitation = new JobInvitationModel({
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
    }),
  ),
  ah(async (req, res) => {
    const { employeeId } = req.body;

    const existing = await JobInvitationModel.findOne({
      employeeId,
    });

    const invited = Boolean(existing);
    return reply(res, { invited });
  }),
);
