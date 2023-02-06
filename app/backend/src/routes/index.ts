import { Router } from 'express';
import UserRoutes from './User.routes';
import TeamRoutes from './Team.routes';
import MatchRoutes from './Match.routes';
import LeaderboardRoutes from './Leaderboard.routes';

export default class Routes {
  public router: Router;
  private _userRoutes: UserRoutes;
  private _teamRoutes: TeamRoutes;
  private _matchRoutes: MatchRoutes;
  private _leaderboardRoutes: LeaderboardRoutes;

  constructor() {
    this.router = Router();
    this._userRoutes = new UserRoutes();
    this._teamRoutes = new TeamRoutes();
    this._matchRoutes = new MatchRoutes();
    this._leaderboardRoutes = new LeaderboardRoutes();

    this.router.use('/login', this._userRoutes.router);
    this.router.use('/teams', this._teamRoutes.router);
    this.router.use('/matches', this._matchRoutes.router);
    this.router.use('/leaderboard', this._leaderboardRoutes.router);
  }
}
