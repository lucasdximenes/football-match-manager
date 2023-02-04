import { Request, Response } from 'express';
import IMatchServices from '../services/interfaces/IMatchServices';
import IMatchControllers from './interfaces/IMatchControllers';

export default class MatchControllers implements IMatchControllers {
  constructor(private matchServices: IMatchServices) {}

  public getAll = async (req: Request, res: Response): Promise<Response> => {
    const matches = await this.matchServices.getAll();
    return res.status(200).json(matches);
  };
}
