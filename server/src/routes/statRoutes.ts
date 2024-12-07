import express from 'express';
import { requireAuthenticated } from 'middleware/authMiddleware';
import { getPlatformStatsController } from 'controllers/statCtrl';

export const router = express.Router();

/**
 * @swagger
 * /api/admin/stats:
 *   get:
 *     summary: Provides key metrics and statistics on platform usage
 *     description: Retrieve statistics like active users, jobs posted, and applications submitted.
 *     responses:
 *       200:
 *         description: Platform statistics
 *       403:
 *         description: Forbidden
 */
router.get(
  '/api/admin/stats',
  requireAuthenticated(['admin']),
  getPlatformStatsController,
);
