import Match from '../database/models/Match';
import IMatchServices from './interfaces/IMatchServices';
import IMatchRepository from '../repositories/interfaces/IMatchRepository';

export default class MatchServices implements IMatchServices {
  constructor(private matchRepository: IMatchRepository) {}

  public async getAll(): Promise<Match[]> {
    const matches = await this.matchRepository.getAll();
    return matches;
  }
}
