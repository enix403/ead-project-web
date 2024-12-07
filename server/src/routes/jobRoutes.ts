import express from 'express';

import Joi from 'joi';

import { requireAuthenticated } from 'middleware/authMiddleware';
import { validateJoi } from 'middleware/validateJoi';

import {
  searchJobController,
  getJobDetailsController,
  applyJobController,
  getApplicationDetailsController,
  getMyApplicationsController,
  postJobController,
  getEmployerPostingsController,
  getJobApplicantsController,
  updateJobStatusController,
  updateApplicationDecisionController,
  markApplicationInterestedController,
  deleteJobPostingController,
} from 'controllers/jobCtrls';

export const router = express.Router();

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
router.get(
  '/api/job/search',
  validateJoi(jobSearchSchema),
  searchJobController,
);

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
router.get(
  '/api/job/:jobId',
  validateJoi(jobIdSchema),
  getJobDetailsController,
);

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
  validateJoi(jobApplicationSchema),
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
  requireAuthenticated(),
  validateJoi(applicationIdSchema),
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
  validateJoi(jobPostingSchema),
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

/**
 * @swagger
 * /api/job/{jobId}:
 *   delete:
 *     summary: Allows the admin to remove a job posting from the platform
 *     description: Admin can delete any job posting by its ID.
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job posting deleted successfully
 *       404:
 *         description: Job posting not found
 *       403:
 *         description: Forbidden
 */
router.delete(
  '/api/job/:jobId',
  requireAuthenticated(['admin']),
  deleteJobPostingController,
);
