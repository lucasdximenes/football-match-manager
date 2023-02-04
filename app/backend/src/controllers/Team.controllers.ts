import { Request, Response } from 'express';
import ITeamServices from '../services/interfaces/ITeamServices';
import ITeamControllers from './interfaces/ITeamControllers';

export default class TeamControllers implements ITeamControllers {
  constructor(private teamService: ITeamServices) {}

  public getAll = async (_req: Request, res: Response): Promise<Response> => {
    const teams = await this.teamService.getAll();
    return res.status(200).json({ teams });
  };
}
