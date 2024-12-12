import { Request, Response } from 'express';

import { JobPostingModel } from 'db/models/jobPosting';
import { JobApplicationModel } from 'db/models/jobApplication';
import { ApplicationError, NotFound } from 'experimental/errors';
import { reply } from 'experimental/app-reply';

const getDateFromFilter = (filter: string): Date | null => {
  const now = new Date();
  switch (filter) {
    case 'lastHour':
      return new Date(now.getTime() - 60 * 60 * 1000); // 1 hour ago
    case 'last24Hours':
      return new Date(now.getTime() - 24 * 60 * 60 * 1000); // 24 hours ago
    case 'last7Days':
      return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days ago
    case 'all':
    default:
      return null;
  }
};

// GET /api/job/search
export async function searchJobController(req: Request, res: Response) {
  const {
    category,
    jobType,
    datePosted,
    expLevelRequired,
    title,
    desc,
    specialism,
    qualificationsRequired,
    qualificationsDesired,
    startDate,
    endDate,
    startTime,
    endTime,
    benefits,
    workingLanguage,
    residence,
    food,
    transport,
    posterId,
  } = req.query;

  const filters: any = {};

  // General helper for handling string or array fields
  const handleStringOrArray = (field: any) =>
    Array.isArray(field) ? { $in: field } : field;

  // Filter by category
  if (category) filters.category = category;

  // Filter by jobType
  if (jobType) filters.jobType = handleStringOrArray(jobType);

  // Filter by expLevelRequired
  if (expLevelRequired)
    filters.expLevelRequired = handleStringOrArray(expLevelRequired);

  // Filter by datePosted
  if (datePosted) {
    const dateFilters = (
      Array.isArray(datePosted) ? datePosted : [datePosted]
    ).map((x) => x.toString());

    const longestDateFilter = dateFilters.includes('all')
      ? 'all'
      : dateFilters.reduce((prev, curr) =>
          getDateFromFilter(prev) && getDateFromFilter(curr)
            ? getDateFromFilter(prev)! < getDateFromFilter(curr)!
              ? prev
              : curr
            : prev,
        );

    const dateThreshold = getDateFromFilter(longestDateFilter);
    if (dateThreshold) filters.postedAt = { $gte: dateThreshold };
  }

  // Filter by title (partial match)
  if (title) filters.title = { $regex: title, $options: 'i' };

  // Filter by description (partial match)
  if (desc) filters.description = { $regex: desc, $options: 'i' };

  // Filter by specialism
  if (specialism) filters.specialism = specialism;

  // Filter by qualificationsRequired
  if (qualificationsRequired)
    filters.qualificationsRequired = handleStringOrArray(
      qualificationsRequired,
    );

  // Filter by qualificationsDesired
  if (qualificationsDesired)
    filters.qualificationsDesired = handleStringOrArray(qualificationsDesired);

  // Filter by startDate and endDate
  if (startDate) filters.startDate = { $gte: new Date(startDate as string) };
  if (endDate) filters.endDate = { $lte: new Date(endDate as string) };

  // Filter by startTime and endTime
  if (startTime) filters.startTime = { $gte: new Date(startTime as string) };
  if (endTime) filters.endTime = { $lte: new Date(endTime as string) };

  // Filter by benefits
  if (benefits) filters.benefits = handleStringOrArray(benefits);

  // Filter by workingLanguage
  if (workingLanguage)
    filters.workingLanguage = handleStringOrArray(workingLanguage);

  // Filter by residence
  if (residence) filters.residence = handleStringOrArray(residence);

  // Filter by food
  if (food) filters.food = handleStringOrArray(food);

  // Filter by transport
  if (transport) filters.transport = handleStringOrArray(transport);

  // Filter by posterId
  if (posterId) filters.posterId = posterId;

  // Query the database
  const jobs = await JobPostingModel.find(filters).populate('poster');

  // Return the filtered results
  return reply(res, jobs);
}

/* ----------------------------------- */

// GET /api/job/:jobId
export async function getJobDetailsController(req: Request, res: Response) {
  const job = await JobPostingModel.findById(req.params.jobId);
  if (!job) return res.status(404).json({ message: 'Job not found' });
  res.json(job);
}

/* ----------------------------------- */

// POST /api/job/apply
export async function applyJobController(req: Request, res: Response) {
  // await JobApplicationModel.deleteMany({});
  const { postingId, answers } = req.body;
  const employeeId = req.user!._id;

  // Fetch the job posting to retrieve the job poster's ID
  const posting = await JobPostingModel.findById(postingId);
  if (!posting) throw new NotFound();

  const existingAppl = await JobApplicationModel.findOne({
    employeeId,
    postingId,
  });

  if (existingAppl) {
    throw new ApplicationError(
      'Already applied to this job',
      400,
      'already_applied',
    );
  }

  // Create the application with the job poster's ID
  const application = new JobApplicationModel({
    postingId,
    employeeId,
    posterId: posting.posterId,
    answers,
    decision: 'waiting',
    appliedAt: new Date(),
  });

  await application.save();

  return reply(res, {
    message: 'Application submitted successfully',
    application,
  });
}

/* ----------------------------------- */

// GET /api/job/application/:applicationId
export async function getApplicationDetailsController(
  req: Request,
  res: Response,
) {
  const application = await JobApplicationModel.findById(
    req.params.applicationId,
  )
    .populate('jobId', 'title')
    .populate('employeeId', 'fullName');

  if (!application)
    return res.status(404).json({ message: 'Application not found' });

  const isAuthorized =
    req.user!._id.equals(application.employeeId) ||
    req.user!._id.equals(application.posterId); // Simplified check

  if (!isAuthorized) return res.status(403).json({ message: 'Forbidden' });

  res.json(application);
}

/* ----------------------------------- */

// GET /api/employee/my-applications
export async function getMyApplicationsController(req: Request, res: Response) {
  const applications = await JobApplicationModel.find({
    employeeId: req.user!._id,
  }).populate('jobId', 'title');

  res.json(applications);
}

/* ----------------------------------- */

// POST /api/job/post
export async function postJobController(req: Request, res: Response) {
  // TODO: check auth
  const jobData = req.body;
  const job = new JobPostingModel({
    ...jobData,
    postedAt: jobData['postedAt'] || new Date(),
    expireAt: undefined, // No expiry for now
    isActive: true,
    posterId: req.user!._id,
  });
  await job.save();
  res.status(201).json({ message: 'Job posted successfully', job });
}

/* ----------------------------------- */

// GET /api/employer/my-postings
export async function getEmployerPostingsController(
  req: Request,
  res: Response,
) {
  const postings = await JobPostingModel.find({
    posterId: req.user!._id,
  }).populate({
    path: 'applications',
    populate: {
      path: 'applicant',
    },
  });

  res.json(postings);
}

/* ----------------------------------- */

// GET /api/job/:jobId/applicants
export async function getJobApplicantsController(req: Request, res: Response) {
  const { jobId } = req.params;
  const job = await JobPostingModel.findById(jobId);

  if (!job || !job.posterId.equals(req.user!._id)) {
    return res
      .status(403)
      .json({ message: 'Forbidden: Not authorized to view applicants' });
  }

  const applicants = await JobApplicationModel.find({ jobId });
  res.json(applicants);
}

/* ----------------------------------- */

// PATCH /api/job/:jobId/update-status
export async function updateJobStatusController(req: Request, res: Response) {
  const { jobId } = req.params;
  const { isActive } = req.body;

  const job = await JobPostingModel.findById(jobId);
  if (!job || !job.posterId.equals(req.user!._id)) {
    return res
      .status(403)
      .json({ message: 'Forbidden: Not authorized to update this job' });
  }

  job.isActive = isActive;
  await job.save();
  res.json({ message: 'Job status updated', job });
}

/* ----------------------------------- */

// PATCH /api/job/application/:applicationId/update-decision
export async function updateApplicationDecisionController(
  req: Request,
  res: Response,
) {
  const { applicationId } = req.params;
  const { decision } = req.body;

  const application = await JobApplicationModel.findById(applicationId);
  if (!application || !application.posterId.equals(req.user!._id)) {
    return res.status(403).json({
      message: 'Forbidden: Not authorized to update this application',
    });
  }

  application.decision = decision;
  await application.save();
  res.json({ message: 'Application decision updated', application });
}

/* ----------------------------------- */

// PATCH /api/job/application/:applicationId/mark-interested
export async function markApplicationInterestedController(
  req: Request,
  res: Response,
) {
  const { applicationId } = req.params;
  const { isInterested } = req.body;

  const application = await JobApplicationModel.findById(applicationId);
  if (!application || !application.posterId.equals(req.user!._id)) {
    return res.status(403).json({
      message: 'Forbidden: Not authorized to update this application',
    });
  }

  application.isEmployerInterested = isInterested;
  await application.save();
  res.json({ message: 'Application interest marked', application });
}

/* ----------------------------------- */

// DELETE /api/job/:jobId
export async function deleteJobPostingController(req: Request, res: Response) {
  const { jobId } = req.params;
  const job = await JobPostingModel.findById(jobId);

  if (!job) {
    return res.status(404).json({ message: 'Job posting not found' });
  }

  await JobPostingModel.findByIdAndDelete(jobId);
  res.json({ message: 'Job posting deleted successfully' });
}
