import { Request, Response } from 'express';

import { JobPostingModel } from 'db/models/jobPosting';
import { UserModel } from 'db/models/user';
import { JobApplicationModel } from 'db/models/jobApplication';

// GET /api/admin/stats
export async function getPlatformStatsController(req: Request, res: Response) {
  const activeUsers = await UserModel.countDocuments({
    isBanned: false,
  });
  const jobsPosted = await JobPostingModel.countDocuments();
  const applicationsSubmitted = await JobApplicationModel.countDocuments();

  res.json({
    activeUsers,
    jobsPosted,
    applicationsSubmitted,
  });
}
