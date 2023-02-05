import { Request, Response, NextFunction } from 'express';
import { badRequest } from '@hapi/boom';

export default class MatchValidations {
  static validateMatchInProgressQuery = (
    req: Request,
    _res: Response,
    next: NextFunction,
  ) => {
    const { inProgress } = req.query;
    if (!inProgress) {
      return next();
    }

    if (inProgress !== 'true' && inProgress !== 'false') {
      throw badRequest('inProgress query must be true or false');
    }
    return next();
  };
}
