import Match from '../../database/models/Match';
import {
  Matches,
  newMatchBody,
  updateMatchBody,
} from '../../interfaces/Match.interface';
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

  public async getById(id: number): Promise<Match | null> {
    const match = await this.matchModel.findByPk(id);
    return match;
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

  public async createMatch(match: newMatchBody): Promise<Match> {
    const newMatch = await this.matchModel.create(match);
    return newMatch;
  }

  public async finishMatch(matchId: number): Promise<void> {
    await this.matchModel.update(
      { inProgress: false },
      { where: { id: matchId } },
    );
  }

  public async updateMatchGoals(
    matchId: number,
    matchUpdate: updateMatchBody,
  ): Promise<Match> {
    await this.matchModel.update(matchUpdate, { where: { id: matchId } });
    const updatedMatch = await this.matchModel.findByPk(matchId);
    return updatedMatch as Match;
  }
}
