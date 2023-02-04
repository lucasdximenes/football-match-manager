import * as bcrypt from 'bcryptjs';
import { unauthorized } from '@hapi/boom';
import tokenUtils from '../utils/tokenUtils';
import { IUserServices, Token } from './interfaces/IUserServices';
import IUserRepository from '../repositories/interfaces/IUserRepository';

export default class UserServices implements IUserServices {
  constructor(private userRepository: IUserRepository) {}

  public async login(email: string, password: string): Promise<Token | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw unauthorized('Incorrect email or password');

    const { password: userPassword } = user;
    const isPasswordCorrect = await bcrypt.compare(password, userPassword);

    if (!isPasswordCorrect) {
      throw unauthorized('Incorrect email or password');
    }

    const { password: _, ...userWithoutPassword } = user;
    const token = tokenUtils.generateToken(userWithoutPassword);
    return token;
  }

  public async getRole(id: number): Promise<string> {
    const user = await this.userRepository.findById(id);
    if (!user) throw unauthorized('User not found');

    const { role } = user;

    return role;
  }
}
