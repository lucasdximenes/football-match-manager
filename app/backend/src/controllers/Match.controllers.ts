import { Request, Response } from 'express';
import IMatchServices from '../services/interfaces/IMatchServices';
import IMatchControllers from './interfaces/IMatchControllers';

export default class MatchControllers implements IMatchControllers {
  constructor(private matchServices: IMatchServices) {}

  public getAll = async (req: Request, res: Response): Promise<Response> => {
    const { inProgress } = req.query;
    if (inProgress) {
      return this.getByProgress(req, res);
    }
    const matches = await this.matchServices.getAll();
    return res.status(200).json(matches);
  };

  public getByProgress = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    const { inProgress } = req.query;
    const inProgressBool = inProgress === 'true';
    const matches = await this.matchServices.getByProgress(inProgressBool);
    return res.status(200).json(matches);
  };
}
