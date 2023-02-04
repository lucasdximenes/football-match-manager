import { Request, Response, NextFunction } from 'express';
import { badRequest } from '@hapi/boom';
import tokenUtils from '../../utils/tokenUtils';

export default class UserValidations {
  static validateUserLogin = (
    req: Request,
    _res: Response,
    next: NextFunction,
  ) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw badRequest('All fields must be filled');
    }

    return next();
  };

  static validateToken = (req: Request, _res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
      throw badRequest('Token not found');
    }

    req.body.user = tokenUtils.verifyToken(authorization);

    return next();
  };
}
