import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

/**
 * This function will check if the user is authenticated and, if so, insert
 * the id in the request
 */
export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  // JWT verification
  const authHeader = request.headers.authorization;
  if (!authHeader) throw new AppError('JWT token is missing', 401);

  // JWT validation
  const [, token] = authHeader.split(' ');
  try {
    // if successfull, will return iat, exp and sub
    const decoded = verify(token, authConfig.jwt.secret);

    // sub = subject = user who generated the token
    const { sub } = decoded as TokenPayload;

    // look src/@types/express.d.ts
    request.user = { id: sub }; // user id now is available in other routes

    return next();
  } catch {
    throw new AppError('Invalid token', 401);
  }
}
