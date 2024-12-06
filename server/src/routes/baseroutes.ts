import mongoose from 'mongoose';
import express, { Request, Response, NextFunction } from 'express';

import Joi from 'joi';

import { IUser, UserModel } from 'db/models/user';
import { IJobPosting, JobPostingModel } from 'db/models/jobPosting';
import { IJobApplication, JobApplicationModel } from 'db/models/jobApplication';

const router = express.Router();

// Validation middleware
function validate(schema: Joi.ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate({
      ...req.body,
      ...req.query,
      ...req.params,
    });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    next();
  };
}

/* =========================== */
/* ======= Controllers ======= */
/* =========================== */

/**
 * Controller for searching jobs with filters.
 */
async function searchJobController(req: Request, res: Response) {
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

/**
 * Controller for retrieving job posting details.
 */
async function getJobDetailsController(req: Request, res: Response) {
  const job = await JobPostingModel.findById(req.params.jobId);
  if (!job) return res.status(404).json({ message: 'Job not found' });
  res.json(job);
}

/* ----------------------------------- */

/**
 * Controller for applying to a job.
 */
async function applyJobController(req: Request, res: Response) {
  const { jobId } = req.params;

  // Fetch the job posting to retrieve the job poster's ID
  const jobPosting = await JobPostingModel.findById(jobId);
  if (!jobPosting) return res.status(404).json({ message: 'Job not found' });

  // Check if the logged-in user is an employee
  if (req.user?.role !== 'employee')
    return res
      .status(403)
      .json({ message: 'Only employees can apply for jobs' });

  // Create the application with the job poster's ID
  const application = new JobApplicationModel({
    jobId,
    employeeId: req.user._id,
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

/**
 * Controller for viewing job application details.
 */
async function getApplicationDetailsController(req: Request, res: Response) {
  const application = await JobApplicationModel.findById(
    req.params.applicationId,
  )
    .populate('jobId', 'title')
    .populate('employeeId', 'fullName');

  if (!application)
    return res.status(404).json({ message: 'Application not found' });

  const isAuthorized =
    req.user &&
    (req.user._id.equals(application.employeeId) ||
      req.user._id.equals(application.jobPosterId)); // Simplified check

  if (!isAuthorized) return res.status(403).json({ message: 'Forbidden' });

  res.json(application);
}

/* ----------------------------------- */

/**
 * Controller for fetching employee's job applications.
 */
async function getMyApplicationsController(req: Request, res: Response) {
  // Check if the logged-in user is an employee
  if (req.user?.role !== 'employee')
    return res.status(403).json({ message: 'Only employees are allowed' });

  // TODO: check employee
  const applications = await JobApplicationModel.find({
    employeeId: req.user!._id,
  }).populate('jobId', 'title');

  res.json(applications);
}

/* ============================ */
/* ========== Routes ========== */
/* ============================ */

const jobSearchSchema = Joi.object({
  title: Joi.string().optional(),
  location: Joi.string().optional(),
  jobType: Joi.string()
    .valid('fullTime', 'partTime', 'internship', 'specificDates')
    .optional(),
});

/**
 * @swagger
 * /api/job/search:
 *   get:
 *     summary: Search for job postings
 *     description: Allows searching for job postings with optional filters.
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Filter by job title.
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: Filter by job location.
 *       - in: query
 *         name: jobType
 *         schema:
 *           type: string
 *           enum: [fullTime, partTime, internship, specificDates]
 *         description: Filter by job type.
 *     responses:
 *       200:
 *         description: List of jobs matching the filters.
 *       400:
 *         description: Invalid request parameters.
 */
router.get('/api/job/search', validate(jobSearchSchema), searchJobController);

/* ----------------------------------- */

const jobIdSchema = Joi.object({
  jobId: Joi.string().hex().length(24).required(),
});

/**
 * @swagger
 * /api/job/{jobId}:
 *   get:
 *     summary: Get job posting details
 *     description: Retrieves detailed information about a specific job posting.
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the job posting.
 *     responses:
 *       200:
 *         description: Detailed information of the job posting.
 *       404:
 *         description: Job not found.
 */
router.get('/api/job/:jobId', validate(jobIdSchema), getJobDetailsController);

/* ----------------------------------- */

const jobApplicationSchema = Joi.object({
  jobId: Joi.string().hex().length(24).required(),
  answers: Joi.array()
    .items(
      Joi.object({
        question: Joi.string().required(),
        answer: Joi.string().required(),
      }),
    )
    .required(),
});

/**
 * @swagger
 * /api/job/{jobId}/apply:
 *   post:
 *     summary: Apply to a job
 *     description: Allows an employee to apply for a specific job.
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the job to apply to.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               answers:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     question:
 *                       type: string
 *                     answer:
 *                       type: string
 *                 description: List of answers to job-related questions.
 *     responses:
 *       201:
 *         description: Job application created successfully.
 *       403:
 *         description: Forbidden.
 */
router.post(
  '/api/job/:jobId/apply',
  validate(jobApplicationSchema),
  applyJobController,
);

/* ----------------------------------- */

const applicationIdSchema = Joi.object({
  applicationId: Joi.string().hex().length(24).required(),
});

/**
 * @swagger
 * /api/job/application/{applicationId}:
 *   get:
 *     summary: Get application details
 *     description: Retrieves details of a specific job application.
 *     parameters:
 *       - in: path
 *         name: applicationId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the job application.
 *     responses:
 *       200:
 *         description: Application details retrieved successfully.
 *       403:
 *         description: Forbidden.
 *       404:
 *         description: Application not found.
 */
router.get(
  '/api/job/application/:applicationId',
  validate(applicationIdSchema),
  getApplicationDetailsController,
);

/* ----------------------------------- */

/**
 * @swagger
 * /api/employee/my-applications:
 *   get:
 *     summary: Get user's job applications
 *     description: Fetches a list of job applications submitted by the logged-in employee.
 *     responses:
 *       200:
 *         description: List of job applications submitted by the user.
 *       403:
 *         description: Forbidden.
 */
router.get('/api/employee/my-applications', getMyApplicationsController);
