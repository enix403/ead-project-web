import express from 'express';
import ah from 'express-async-handler';

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

router.get(
  '/api/job/search',
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

router.post(
  '/api/job/apply',
  requireAuthenticated(['employee']),
  validateJoi(
    Joi.object({
      postingId: Joi.string().hex().length(24).required(),
      answers: Joi.array()
        .items(
          Joi.object({
            question: Joi.string().required(),
            answer: Joi.string().required(),
          }),
        )
        .required(),
    }),
  ),
  ah(applyJobController),
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
  salary: Joi.string().required(),

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

  companyName: Joi.string().allow('').optional(),
  companyUsername: Joi.string().allow('').optional(),
  companyDescription: Joi.string().allow('').optional(),
  companyWebsite: Joi.string().allow('').optional(),
  companyLogoImageId: Joi.string().hex().length(24).optional(),
  companyCountry: Joi.string().allow('').optional(),
  companyCity: Joi.string().allow('').optional(),
  companyArea: Joi.string().allow('').optional(),
  companyZip: Joi.string().allow('').optional(),
  companyMapAddress: Joi.string().allow('').optional(),

  questions: Joi.array().items(Joi.string()).optional(),
  postedAt: Joi.date().allow('').optional(),
});

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
