import { Request, Response } from 'express';

export default interface IMatchControllers {
  getAll(req: Request, res: Response): Promise<Response>;
  getByProgress(req: Request, res: Response): Promise<Response>;
  createMatch(req: Request, res: Response): Promise<Response>;
  finishMatch(req: Request, res: Response): Promise<Response>;
}
