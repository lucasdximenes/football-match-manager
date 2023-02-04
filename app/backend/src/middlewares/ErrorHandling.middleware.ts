import { Request, Response, NextFunction } from 'express';
import { isBoom } from '@hapi/boom';

export default class ErrorHandlingMiddleware {
  static handle = (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    if (isBoom(err)) {
      const { statusCode, message } = err.output.payload;
      return res.status(statusCode).json({ message });
    }

    console.error(err);
    return res.status(500).json({
      message: 'An internal server error occurred',
    });
  };
}
