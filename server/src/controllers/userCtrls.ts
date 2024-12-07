import { Request, Response } from 'express';

import { UserModel } from 'db/models/user';

// GET /api/me/profile
export async function getCurrentUserProfileController(req: Request, res: Response) {
  const user = await UserModel.findById(req.user!._id);
  res.json(user);
}

/* ----------------------------------- */

// PATCH /api/me/profile
export async function updateCurrentUserProfileController(req: Request, res: Response) {
  await UserModel.findByIdAndUpdate(req.user!._id, req.body, { new: true });
  res.json({ message: 'Profile updated successfully' });
}

/* ----------------------------------- */

// GET /api/user/:userId
export async function getUserProfileController(req: Request, res: Response) {
  const { userId } = req.params;
  const user = await UserModel.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
}

/* ----------------------------------- */

// GET /api/admin/users
export async function getAllUsersController(req: Request, res: Response) {
  // TODO: add pagination if required
  const users = await UserModel.find();
  res.json(users);
}

/* ----------------------------------- */

// PATCH /api/admin/user/:userId/ban
export async function banUserController(req: Request, res: Response) {
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
