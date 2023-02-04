import Match from '../../database/models/Match';
import IMatchRepository from '../interfaces/IMatchRepository';

export default class MatchRepository implements IMatchRepository {
  constructor(private matchModel: typeof Match) {}

  public async getAll(): Promise<Match[]> {
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
    return matches;
  }
}
