import { Router } from 'express';
import UserRoutes from './User.routes';
import TeamRoutes from './Team.routes';
import MatchRoutes from './Match.routes';

export default class Routes {
  public router: Router;
  private _userRoutes: UserRoutes;
  private _teamRoutes: TeamRoutes;
  private _matchRoutes: MatchRoutes;

  constructor() {
    this.router = Router();
    this._userRoutes = new UserRoutes();
    this._teamRoutes = new TeamRoutes();
    this._matchRoutes = new MatchRoutes();

    this.router.use('/login', this._userRoutes.router);
    this.router.use('/teams', this._teamRoutes.router);
    this.router.use('/matches', this._matchRoutes.router);
  }
}
