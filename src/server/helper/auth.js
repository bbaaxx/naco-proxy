// @flow
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import getEnv from '../config/getEnv';

const { JWT_SECRET, JWT_TIMEOUT } = getEnv(['JWT_SECRET', 'JWT_TIMEOUT']);

export const issueUserToken = (userId: { _id: string }) =>
  jwt.sign(userId, JWT_SECRET, { expiresIn: JWT_TIMEOUT });

export const verifyUserToken = (token: string): Promise<any> =>
  new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, function(err, decod) {
      if (!err) return resolve(decod);
      return reject(err);
    });
  });

export const checkUserPassword = async (
  password: string,
  secretHash: string,
) => {
  return await bcrypt.compare(password, secretHash);
};
