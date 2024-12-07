import express from 'express';

import Joi from 'joi';

import { requireAuthenticated } from 'middleware/authMiddleware';
import { validateJoi } from 'middleware/validateJoi';

import {
  getCurrentUserProfileController,
  updateCurrentUserProfileController,
  getUserProfileController,
  getAllUsersController,
  banUserController,
} from 'controllers/userCtrls';

export const router = express.Router();

const profileUpdateSchema = Joi.object({
  name: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phoneNumber: Joi.string().optional(),
  bio: Joi.string().optional(),
});

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
  validateJoi(profileUpdateSchema),
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
