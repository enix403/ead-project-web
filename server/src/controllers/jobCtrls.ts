import { Request, Response } from 'express';
import { Types } from 'mongoose'

import { JobPostingModel } from 'db/models/jobPosting';
import { JobApplicationModel } from 'db/models/jobApplication';

// GET /api/job/search'
export async function searchJobController(req: Request, res: Response) {
  const { title, location, jobType } = req.query;

  // Build filter query based on search parameters
  const filter: any = {};
  if (title) filter.title = new RegExp(title as string, 'i');
  if (location) filter.location = new RegExp(location as string, 'i');
  if (jobType) filter.jobType = jobType;

  const jobs = await JobPostingModel.find(filter);
  res.json(jobs);
}

/* ----------------------------------- */

// GET /api/job/:jobId
export async function getJobDetailsController(req: Request, res: Response) {
  const job = await JobPostingModel.findById(req.params.jobId);
  if (!job) return res.status(404).json({ message: 'Job not found' });
  res.json(job);
}

/* ----------------------------------- */

// POST /api/job/:jobId/apply
export async function applyJobController(req: Request, res: Response) {
  const { jobId } = req.params;

  // Fetch the job posting to retrieve the job poster's ID
  const jobPosting = await JobPostingModel.findById(jobId);
  if (!jobPosting) return res.status(404).json({ message: 'Job not found' });

  // Create the application with the job poster's ID
  const application = new JobApplicationModel({
    jobId,
    employeeId: req.user!._id,
    jobPosterId: jobPosting.posterId,
    appliedAt: new Date(),
    answers: req.body.answers,
  });

  await application.save();
  res
    .status(201)
    .json({ message: 'Application submitted successfully', application });
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
    req.user!._id.equals(application.jobPosterId); // Simplified check

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
    // expireAt: ...
    isActive: true,
    // posterId: req.user!._id,
    posterId: new Types.ObjectId(),
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
  const postings = await JobPostingModel.find({ posterId: req.user!._id });
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
  if (!application || !application.jobPosterId.equals(req.user!._id)) {
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
  if (!application || !application.jobPosterId.equals(req.user!._id)) {
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
