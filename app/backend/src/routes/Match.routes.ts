import { Router } from 'express';
import Match from '../database/models/Match';
import Team from '../database/models/Team';
import MatchValidations from '../middlewares/validations/Match.validations';
import MatchController from '../controllers/Match.controllers';
import MatchServices from '../services/Match.services';
import MatchRepository from '../repositories/sequelize/Match.repository';
import TeamServices from '../services/Team.services';
import TeamRepository from '../repositories/sequelize/Team.repository';
import UserValidations from '../middlewares/validations/User.validations';

export default class MatchRoutes {
  public router: Router;
  private _matchController: MatchController;
  private _matchServices: MatchServices;
  private _matchRepository: MatchRepository;
  private _teamServices: TeamServices;
  private _teamRepository: TeamRepository;

  constructor() {
    this.router = Router();
    this._teamRepository = new TeamRepository(Team);
    this._teamServices = new TeamServices(this._teamRepository);
    this._matchRepository = new MatchRepository(Match);
    this._matchServices = new MatchServices(
      this._matchRepository,
      this._teamServices,
    );
    this._matchController = new MatchController(this._matchServices);

    this._initRoutes();
  }

  private _initRoutes(): void {
    this._initGetRoutes();
    this._initPostRoutes();
    this._initPatchRoutes();
  }

  private _initGetRoutes(): void {
    this.router.get(
      '/',
      MatchValidations.validateMatchInProgressQuery,
      this._matchController.getAll,
    );
  }

  private _initPostRoutes(): void {
    this.router.post(
      '/',
      UserValidations.validateToken,
      MatchValidations.validateNewMatchBody,
      this._matchController.createMatch,
    );
  }

  private _initPatchRoutes(): void {
    this.router.patch(
      '/:matchId',
      UserValidations.validateToken,
      MatchValidations.validateMatchIdParam,
      MatchValidations.validateUpdateMatchGoalsBody,
      this._matchController.updateMatchGoals,
    );

    this.router.patch(
      '/:matchId/finish',
      UserValidations.validateToken,
      MatchValidations.validateMatchIdParam,
      this._matchController.finishMatch,
    );
  }
}
