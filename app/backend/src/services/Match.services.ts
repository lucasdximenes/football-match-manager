import { badRequest } from '@hapi/boom';
import IMatchServices from './interfaces/IMatchServices';
import IMatchRepository from '../repositories/interfaces/IMatchRepository';
import ITeamServices from './interfaces/ITeamServices';
import { Matches, newMatchBody } from '../interfaces/Match.interface';
import Match from '../database/models/Match';

export default class MatchServices implements IMatchServices {
  constructor(
    private matchRepository: IMatchRepository,
    private teamServices: ITeamServices,
  ) {}

  public async getAll(): Promise<Matches[]> {
    const matches = await this.matchRepository.getAll();
    return matches;
  }

  public async getByProgress(progress: boolean): Promise<Matches[]> {
    const matches = await this.matchRepository.getByProgress(progress);
    return matches;
  }

  public async createMatch(match: newMatchBody): Promise<Match> {
    const { homeTeamId, awayTeamId } = match;
    await Promise.all(
      [homeTeamId, awayTeamId].map((teamId) =>
        this.teamServices.getById(teamId)),
    );

    const newMatch = await this.matchRepository.createMatch(match);
    return newMatch;
  }

  public async finishMatch(matchId: number): Promise<void> {
    const match = await this.matchRepository.getById(matchId);
    if (!match) {
      throw badRequest('Match not found');
    }
    if (!match.inProgress) {
      throw badRequest('Match already finished');
    }
    await this.matchRepository.finishMatch(matchId);
  }
}
