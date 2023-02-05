import { Router } from 'express';
import Match from '../database/models/Match';
import MatchValidations from '../middlewares/validations/Match.validations';
import MatchController from '../controllers/Match.controllers';
import MatchServices from '../services/Match.services';
import MatchRepository from '../repositories/sequelize/Match.repository';

export default class MatchRoutes {
  public router: Router;
  private _matchController: MatchController;
  private _matchServices: MatchServices;
  private _matchRepository: MatchRepository;

  constructor() {
    this.router = Router();
    this._matchRepository = new MatchRepository(Match);
    this._matchServices = new MatchServices(this._matchRepository);
    this._matchController = new MatchController(this._matchServices);

    this.router.get(
      '/',
      MatchValidations.validateMatchInProgressQuery,
      this._matchController.getAll,
    );
  }
}
