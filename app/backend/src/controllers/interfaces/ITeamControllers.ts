import { Request, Response } from 'express';

export default interface ITeamControllers {
  getAll(req: Request, res: Response): Promise<Response>;
  getById(req: Request, res: Response): Promise<Response>;
}
