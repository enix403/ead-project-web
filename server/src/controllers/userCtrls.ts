import express, { Request, Response } from 'express';

import Joi from 'joi';

import { UserModel } from 'db/models/user';
import { JobPostingModel } from 'db/models/jobPosting';
import { JobApplicationModel } from 'db/models/jobApplication';

import { requireAuthenticated } from 'middleware/authMiddleware';
import { validateJoi } from 'middleware/validateJoi';

const router = express.Router();
