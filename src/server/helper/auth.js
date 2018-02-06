// @flow
import jwt from 'jsonwebtoken';
import getEnv from '../config/getEnv';

const { JWT_SECRET, JWT_TIMEOUT } = getEnv(['JWT_SECRET', 'JWT_TIMEOUT']);

export const issueUserToken = (userId: { _id: string }) =>
  jwt.sign(userId, JWT_SECRET, { expiresIn: JWT_TIMEOUT });
