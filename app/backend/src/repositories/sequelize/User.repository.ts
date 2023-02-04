import User from '../../database/models/User';
import IUserRepository from '../interfaces/IUserRepository';

export default class UserRepository implements IUserRepository {
  constructor(private userModel: typeof User) {}

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({
      where: { email },
      raw: true,
    });
    return user;
  }

  public async findById(id: number): Promise<User | null> {
    const user = await this.userModel.findByPk(id, { raw: true });
    return user;
  }
}
