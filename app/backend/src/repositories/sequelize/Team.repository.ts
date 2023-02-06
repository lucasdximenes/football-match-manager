import { QueryTypes } from 'sequelize';
import sequelize from '../../database/models';
import Team from '../../database/models/Team';
import ITeamRepository from '../interfaces/ITeamRepository';
import Leaderboard from '../../interfaces/Leaderboard.interface';
import {
  homeTeamsLeaderBoardQuery,
  awayTeamsLeaderBoardQuery,
  teamsLeaderBoardQuery,
} from './rawQueries';

export default class TeamRepository implements ITeamRepository {
  constructor(private teamModel: typeof Team, private _seq = sequelize) {}

  public async getAll(): Promise<Team[]> {
    const teams = await this.teamModel.findAll();
    return teams;
  }

  public async getById(id: number): Promise<Team | null> {
    const team = await this.teamModel.findByPk(id);
    return team;
  }

  private static _getQuery(type: string): string {
    let query = '';
    switch (type) {
      case 'home':
        query = homeTeamsLeaderBoardQuery;
        break;
      case 'away':
        query = awayTeamsLeaderBoardQuery;
        break;
      default:
        query = teamsLeaderBoardQuery;
        break;
    }
    return query;
  }

  public async getLeaderboard(type: string): Promise<Leaderboard[]> {
    const query = TeamRepository._getQuery(type);
    const teams = await this._seq.query(query, {
      type: QueryTypes.SELECT,
    });
    return teams as Leaderboard[];
  }
}
