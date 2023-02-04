import { Request, Response } from 'express';

export default interface IUserControllers {
  login(req: Request, res: Response): Promise<Response>;
  getRole(req: Request, res: Response): Promise<Response>;
}
