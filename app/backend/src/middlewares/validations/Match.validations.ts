import { Request, Response, NextFunction } from 'express';
import { badRequest, badData } from '@hapi/boom';
import { newMatchBody, updateMatchGoals } from './schemas/Match.schemas';

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

  static validateNewMatchBody = (
    req: Request,
    _res: Response,
    next: NextFunction,
  ) => {
    const { error } = newMatchBody.validate(req.body);
    if (error) {
      throw badRequest(error.message);
    }

    const { homeTeamId, awayTeamId } = req.body;
    if (homeTeamId === awayTeamId) {
      throw badData(
        'It is not possible to create a match with two equal teams',
      );
    }

    return next();
  };

  static validateMatchIdParam = (
    req: Request,
    _res: Response,
    next: NextFunction,
  ) => {
    const { matchId } = req.params;

    if (Number.isNaN(Number(matchId))) {
      throw badRequest('matchId must be a number');
    }

    return next();
  };

  static validateUpdateMatchGoalsBody = (
    req: Request,
    _res: Response,
    next: NextFunction,
  ) => {
    const { error } = updateMatchGoals.validate(req.body);
    if (error) {
      throw badRequest(error.message);
    }

    return next();
  };
}
