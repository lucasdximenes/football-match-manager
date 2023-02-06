import { Router } from 'express';
import Team from '../database/models/Team';
import TeamController from '../controllers/Team.controllers';
import TeamServices from '../services/Team.services';
import TeamRepository from '../repositories/sequelize/Team.repository';

export default class LeaderboardRoutes {
  public router: Router;
  private _teamController: TeamController;
  private _teamServices: TeamServices;
  private _teamRepository: TeamRepository;

  constructor() {
    this.router = Router();
    this._teamRepository = new TeamRepository(Team);
    this._teamServices = new TeamServices(this._teamRepository);
    this._teamController = new TeamController(this._teamServices);

    this.router.get('/', this._teamController.getLeaderboard);
    this.router.get('/home', this._teamController.getLeaderboard);
    this.router.get('/away', this._teamController.getLeaderboard);
  }
}
