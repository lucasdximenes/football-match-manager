import Match from '../../database/models/Match';
import Matches from '../../interfaces/Match.interface';
import IMatchRepository from '../interfaces/IMatchRepository';

export default class MatchRepository implements IMatchRepository {
  constructor(private matchModel: typeof Match) {}

  public async getAll(): Promise<Matches[]> {
    const matches = await this.matchModel.findAll({
      include: [
        {
          association: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          association: 'awayTeam',
          attributes: ['teamName'],
        },
      ],
    });
    return matches as unknown as Matches[];
  }

  public async getByProgress(inProgress: boolean): Promise<Matches[]> {
    const matches = await this.matchModel.findAll({
      where: { inProgress },
      include: [
        {
          association: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          association: 'awayTeam',
          attributes: ['teamName'],
        },
      ],
    });
    return matches as unknown as Matches[];
  }
}
