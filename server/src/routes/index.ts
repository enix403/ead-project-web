import express from 'express';
// import { authRoutes } from './authRoutes';
// import { financialRoutes } from './financialRoutes';
// import { userRoutes } from './userRoutes';
// import { scraperRoutes } from './scraperRoutes';

export function appRoutes() {
  const router = express.Router();
  // authRoutes(router);
  // financialRoutes(router);
  // userRoutes(router);
  // scraperRoutes(router);
  return router;
}
