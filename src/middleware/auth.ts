import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '../errors/AppError';

const authentication = (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> | void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    verify(token, String(process.env.APP_SECRET));

    next();
  } catch (error) {
    console.log('Error Auth ===>>', error);
    throw new AppError('JWT token is invalid', 401);
  }
};

export default authentication;
