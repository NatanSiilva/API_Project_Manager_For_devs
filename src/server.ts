/* eslint-disable no-console */
import 'reflect-metadata';
import './config/env';
import 'express-async-errors';
import morgan from 'morgan';
import express, { NextFunction, Request, Response } from 'express';
import './database';
import routes from './routes';
import AppError from './errors/AppError';

const port = process.env.PORT || 3333;

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use(routes);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ status: 'Error', message: err.message });
  }

  console.log(`error.message >>> ${err.message} <<<`);

  return res
    .status(500)
    .json({ status: 'error', message: 'Internal Server Error' });
});

app.listen(port, () =>
  console.log(`🚀  Server is running at: http://localhost:${port}`),
);
