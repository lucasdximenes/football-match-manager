import { Router } from 'express';
import User from '../database/models/User';
import UserController from '../controllers/User.controllers';
import UserValidations from '../middlewares/validations/User.validations';
import UserRepository from '../repositories/sequelize/User.repository';
import UserServices from '../services/User.services';

export default class UserRoutes {
  public router: Router;
  private _userController: UserController;
  private _userServices: UserServices;
  private _userRepository: UserRepository;

  constructor() {
    this.router = Router();
    this._userRepository = new UserRepository(User);
    this._userServices = new UserServices(this._userRepository);
    this._userController = new UserController(this._userServices);

    this.router.post(
      '/',
      UserValidations.validateUserLogin,
      this._userController.login,
    );

    this.router.get(
      '/validate',
      UserValidations.validateToken,
      this._userController.getRole,
    );
  }
}
