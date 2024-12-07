import express, { Request, Response, NextFunction } from 'express';

import Joi from 'joi';

import { UserModel } from 'db/models/user';
import { JobPostingModel } from 'db/models/jobPosting';
import { JobApplicationModel } from 'db/models/jobApplication';

import { requireAuthenticated } from 'middleware/authMiddleware';

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

function tempCheckEmployer(req: Request, res: Response, next: () => void) {
  if (!req.user || req.user.role !== 'employer') {
    return res
      .status(403)
      .json({ message: 'Forbidden: Only employers are allowed' });
  }
  next();
}

function tempCheckEmployee(req: Request, res: Response, next: () => void) {
  if (!req.user || req.user.role !== 'employee') {
    return res
      .status(403)
      .json({ message: 'Forbidden: Only employees are allowed' });
  }
  next();
}

// Middleware to ensure the user is logged in
function tempCheckLoggedIn(req: Request, res: Response, next: () => void) {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized: Please log in' });
  }
  next();
}

// Middleware to ensure the user is an admin
function tempCheckAdmin(req: Request, res: Response, next: () => void) {
  if (!req.user || req.user.role !== 'admin') {
    return res
      .status(403)
      .json({ message: 'Forbidden: Only admins are allowed' });
  }
  next();
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
  const applications = await JobApplicationModel.find({
    employeeId: req.user!._id,
  }).populate('jobId', 'title');

  res.json(applications);
}

/* ----------------------------------- */

// POST /api/job/post
async function postJobController(req: Request, res: Response) {
  // TODO: check auth
  const jobData = req.body;
  const job = new JobPostingModel({
    ...jobData,
    posterId: req.user!._id,
    postedAt: new Date(),
    isActive: true,
  });
  await job.save();
  res.status(201).json({ message: 'Job posted successfully', job });
}

/* ----------------------------------- */

// GET /api/employer/my-postings
async function getEmployerPostingsController(req: Request, res: Response) {
  const postings = await JobPostingModel.find({ posterId: req.user!._id });
  res.json(postings);
}

/* ----------------------------------- */

// GET /api/job/:jobId/applicants
async function getJobApplicantsController(req: Request, res: Response) {
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
async function updateJobStatusController(req: Request, res: Response) {
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
async function updateApplicationDecisionController(
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
async function markApplicationInterestedController(
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

// GET /api/me/profile
async function getCurrentUserProfileController(req: Request, res: Response) {
  const user = await UserModel.findById(req.user!._id);
  res.json(user);
}

/* ----------------------------------- */

// PATCH /api/me/profile
async function updateCurrentUserProfileController(req: Request, res: Response) {
  await UserModel.findByIdAndUpdate(req.user!._id, req.body, { new: true });
  res.json({ message: 'Profile updated successfully' });
}

/* ----------------------------------- */

// GET /api/user/:userId
async function getUserProfileController(req: Request, res: Response) {
  const { userId } = req.params;
  const user = await UserModel.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
}

/* ----------------------------------- */

// GET /api/admin/users
async function getAllUsersController(req: Request, res: Response) {
  // TODO: add pagination if required
  const users = await UserModel.find();
  res.json(users);
}

/* ----------------------------------- */

// PATCH /api/admin/user/:userId/ban
async function banUserController(req: Request, res: Response) {
  const { userId } = req.params;
  const user = await UserModel.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // TODO: add the `isBanned` field to user and then
  // uncomment this line
  // user.isBanned = true;
  await user.save();
  res.json({ message: 'User banned successfully' });
}

/* ----------------------------------- */

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
  requireAuthenticated(['employee']),
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
router.get(
  '/api/employee/my-applications',
  requireAuthenticated(['employee']),
  getMyApplicationsController,
);

/* ----------------------------------- */

const jobPostingSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string().required(),
  specialism: Joi.string().required(),
  jobType: Joi.string()
    .valid('fullTime', 'partTime', 'internship', 'specificDates')
    .required(),
  expLevelRequired: Joi.string().valid('entry', 'mid', 'senior').required(),
  qualificationsRequired: Joi.array().items(Joi.string()).optional(),
  qualificationsDesired: Joi.array().items(Joi.string()).optional(),
  salaryMode: Joi.string().valid('monthly', 'hourly').required(),
  salary: Joi.number().required(),
  startDate: Joi.date().optional(),
  endDate: Joi.date().optional(),
  startTime: Joi.date().optional(),
  endTime: Joi.date().optional(),
  benefits: Joi.array().items(Joi.string()).optional(),
  workingLanguage: Joi.string().required(),
  residence: Joi.string().valid('yes', 'no', 'allowance').required(),
  food: Joi.string()
    .valid('yes', 'no', 'oneMeal', 'twoMeal', 'allowance')
    .required(),
  transport: Joi.string()
    .valid('required', 'notRequired', 'mopedProvided', 'carProvided')
    .required(),
  companyUsername: Joi.string().optional(),
  companyDescription: Joi.string().optional(),
  companyWebsite: Joi.string().optional(),
  companyLogoUrl: Joi.string().optional(),
  questions: Joi.array().items(Joi.string()).optional(),
});

/**
 * @swagger
 * /api/job/post:
 *   post:
 *     summary: Allows an employer to post a new job
 *     description: Employers can create job postings.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JobPosting'
 *     responses:
 *       201:
 *         description: Job posted successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: Forbidden
 */
router.post(
  '/api/job/post',
  requireAuthenticated(['employer']),
  validate(jobPostingSchema),
  postJobController,
);

/* ----------------------------------- */

/**
 * @swagger
 * /api/employer/my-postings:
 *   get:
 *     summary: Returns a list of jobs posted by the employer
 *     description: Retrieve jobs created by the authenticated employer.
 *     responses:
 *       200:
 *         description: List of jobs
 *       403:
 *         description: Forbidden
 */
router.get(
  '/api/employer/my-postings',
  requireAuthenticated(['employer']),
  getEmployerPostingsController,
);

/* ----------------------------------- */

/**
 * @swagger
 * /api/job/{jobId}/applicants:
 *   get:
 *     summary: Fetch a list of employees who have applied for a specific job posting
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of applicants
 *       403:
 *         description: Forbidden
 */
router.get(
  '/api/job/:jobId/applicants',
  requireAuthenticated(['employer']),
  getJobApplicantsController,
);

/* ----------------------------------- */

/**
 * @swagger
 * /api/job/{jobId}/update-status:
 *   patch:
 *     summary: Allow the employer to mark a job posting as active or inactive
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job status updated
 *       403:
 *         description: Forbidden
 */
router.patch(
  '/api/job/:jobId/update-status',
  requireAuthenticated(['employer']),
  updateJobStatusController,
);

/* ----------------------------------- */

/**
 * @swagger
 * /api/job/application/{applicationId}/update-decision:
 *   patch:
 *     summary: Allow the employer to update the decision of the application
 *     parameters:
 *       - in: path
 *         name: applicationId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Application decision updated
 *       403:
 *         description: Forbidden
 */
router.patch(
  '/api/job/application/:applicationId/update-decision',
  requireAuthenticated(['employer']),
  updateApplicationDecisionController,
);

/* ----------------------------------- */

/**
 * @swagger
 * /api/job/application/{applicationId}/mark-interested:
 *   patch:
 *     summary: Allow the employer to mark if they are interested in the application
 *     parameters:
 *       - in: path
 *         name: applicationId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Application interest marked
 *       403:
 *         description: Forbidden
 */
router.patch(
  '/api/job/application/:applicationId/mark-interested',
  requireAuthenticated(['employer']),
  markApplicationInterestedController,
);

/* ----------------------------------- */

const profileUpdateSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phoneNumber: Joi.string().optional(),
  bio: Joi.string().optional(),
});

/* ----------------------------------- */

/**
 * @swagger
 * /api/me/profile:
 *   get:
 *     summary: Get the current user's profile
 *     description: Retrieve the profile information of the logged-in user.
 *     responses:
 *       200:
 *         description: User profile data
 *       401:
 *         description: Unauthorized
 */
router.get(
  '/api/me/profile',
  requireAuthenticated(),
  getCurrentUserProfileController,
);

/* ----------------------------------- */

/**
 * @swagger
 * /api/me/profile:
 *   patch:
 *     summary: Update the current user's profile
 *     description: Allows the logged-in user to update their profile information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserProfileUpdate'
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.patch(
  '/api/me/profile',
  requireAuthenticated(),
  validate(profileUpdateSchema),
  updateCurrentUserProfileController,
);

/* ----------------------------------- */

/**
 * @swagger
 * /api/user/{userId}:
 *   get:
 *     summary: Get any user's profile
 *     description: Retrieve public profile information of any user by user ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User profile data
 *       404:
 *         description: User not found
 */
router.get('/api/user/:userId', getUserProfileController);

/* ----------------------------------- */

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Fetch a list of all users
 *     description: Retrieve a list of all users (employees and employers) for administrative purposes.
 *     responses:
 *       200:
 *         description: List of users
 *       403:
 *         description: Forbidden
 */
router.get(
  '/api/admin/users',
  requireAuthenticated(['admin']),
  getAllUsersController,
);

/* ----------------------------------- */

/**
 * @swagger
 * /api/admin/user/{userId}/ban:
 *   patch:
 *     summary: Allows the admin to ban a user from the platform
 *     description: Admin can ban a user by setting their account status to banned.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User banned successfully
 *       404:
 *         description: User not found
 *       403:
 *         description: Forbidden
 */
router.patch(
  '/api/admin/user/:userId/ban',
  requireAuthenticated(['admin']),
  banUserController,
);
