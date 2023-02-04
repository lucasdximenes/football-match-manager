import { Request, Response } from 'express';
import { IUserServices } from '../services/interfaces/IUserServices';
import IUserControllers from './interfaces/IUserControllers';

export default class UserController implements IUserControllers {
  constructor(private userService: IUserServices) {}

  public login = async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;
    const token = await this.userService.login(email, password);
    return res.status(200).json({ token });
  };

  public getRole = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.body.user;
    const role = await this.userService.getRole(id);
    return res.status(200).json({ role });
  };
}
