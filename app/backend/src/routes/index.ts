import { Router } from 'express';
import UserRoutes from './User.routes';
import TeamRoutes from './Team.routes';

export default class Routes {
  public router: Router;
  private _userRoutes: UserRoutes;
  private _teamRoutes: TeamRoutes;

  constructor() {
    this.router = Router();
    this._userRoutes = new UserRoutes();
    this._teamRoutes = new TeamRoutes();

    this.router.use('/login', this._userRoutes.router);
    this.router.use('/teams', this._teamRoutes.router);
  }
}
