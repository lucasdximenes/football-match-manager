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

  public createMatch = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    const newMatch = await this.matchServices.createMatch({
      homeTeamId,
      awayTeamId,
      homeTeamGoals,
      awayTeamGoals,
    });
    return res.status(201).json(newMatch);
  };

  public finishMatch = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    const { matchId } = req.params;
    await this.matchServices.finishMatch(Number(matchId));
    return res.status(200).json({ message: 'Finished' });
  };

  public updateMatchGoals = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    const { matchId } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const updatedMatch = await this.matchServices.updateMatchGoals(
      Number(matchId),
      {
        homeTeamGoals,
        awayTeamGoals,
      },
    );
    return res.status(200).json(updatedMatch);
  };
}
