import express from 'express';
import ah from 'express-async-handler';
import { ApplicationError } from 'experimental/errors';

import { UserModel } from 'db/models/user';
import { AccessTokenClaims } from 'middleware/AccessTokenClaims';
import jwt from 'jsonwebtoken';
import { appEnv } from 'config/app-env';

import { comparePassword, hashPassword } from './hashing';
import { reply } from 'experimental/app-reply';

const router = express.Router();

router.post(
  '/api/auth/login',
  ah(async (req, res) => {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (
      user == null ||
      !(await comparePassword(password, user.passwordHash || ''))
    ) {
      throw new ApplicationError('Invalid email or password', 200);
    }

    let token = await new Promise<string>((resolve, reject) =>
      jwt.sign(
        { uid: user._id.toString() } satisfies AccessTokenClaims,
        appEnv.JWT_SIGNING_KEY || '',
        (err: any, token: string) => {
          if (err) reject(err);
          else resolve(token);
        },
      ),
    );

    return reply(res, { token });
  }),
);

router.post(
  '/api/auth/register',
  ah(async (req, res) => {
    const { password, role, ...restData } = req.body;

    if (!['employer', 'employee'].includes(role))
      throw new ApplicationError('Invaid role');

    const passwordHash = await hashPassword(password);

    await UserModel.create({
      ...restData,
      role,
      passwordHash,
    });

    return reply(res, "Registered");
  }),
);
