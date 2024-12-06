/*import jwt from 'jsonwebtoken';
import { type Request, type Response } from 'express';
import { Types } from 'mongoose';
import handleAsync from 'express-async-handler';

import { appEnv } from 'config/app-env';
import type { AccessTokenClaims } from 'controllers/authControllers';
import logger from 'utils/logger';
import { User } from 'db/models';

const isAuthenticatedImpl = async (req: Request, res: Response) => {
  const token = req.header('Authorization')?.split(' ')[1];

  logger.warn('middleware checking token...');

  if (!token) {
    res.status(401).send('Access denied. No token provided.');
    logger.warn(
      `Unauthorised access attempt: No token provided - "${token}" `,
    );
    return false;
  }

  let claims: AccessTokenClaims | null = null;

  try {
    claims = await new Promise<AccessTokenClaims>((resolve, reject) =>
      jwt.verify(token, appEnv.JWT_SIGNING_KEY ?? '', (err, decoded) => {
        if (err !== null) reject(err);
        else resolve(decoded as AccessTokenClaims);
      }),
    );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {  }

  const user =
    claims && Types.ObjectId.isValid(claims.uid)
      ? await User.findOne({ _id: claims.uid }).exec()
      : null;

  if (user === null) {
    logger.warn(
      `Unauthorised access attempt: Invalid session token - ${token}`,
    );

    res.status(401).json({ message: 'Unauthorised. Invalid session token.' });

    return false;
  }

  req.state = {
    user,
    accessToken: token,
  };

  return req.state;
};

export function requireAuthenticated() {
  return handleAsync(async (req, res, next) => {
    const authenticated = await isAuthenticatedImpl(req, res);
    if (authenticated) next();
  });
}
*/
