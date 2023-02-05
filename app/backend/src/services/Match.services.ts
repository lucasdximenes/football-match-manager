import IMatchServices from './interfaces/IMatchServices';
import IMatchRepository from '../repositories/interfaces/IMatchRepository';
import Matches from '../interfaces/Match.interface';

export default class MatchServices implements IMatchServices {
  constructor(private matchRepository: IMatchRepository) {}

  public async getAll(): Promise<Matches[]> {
    const matches = await this.matchRepository.getAll();
    return matches;
  }

  public async getByProgress(progress: boolean): Promise<Matches[]> {
    const matches = await this.matchRepository.getByProgress(progress);
    return matches;
  }
}
