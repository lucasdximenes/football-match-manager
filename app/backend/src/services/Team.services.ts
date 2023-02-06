import { notFound } from '@hapi/boom';
import Team from '../database/models/Team';
import ITeamRepository from '../repositories/interfaces/ITeamRepository';
import ITeamServices from './interfaces/ITeamServices';
import Leaderboard from '../interfaces/Leaderboard.interface';

export default class TeamServices implements ITeamServices {
  constructor(private teamRepository: ITeamRepository) {}

  public async getAll(): Promise<Team[]> {
    const teams = await this.teamRepository.getAll();
    return teams;
  }

  public async getById(id: number): Promise<Team> {
    const team = await this.teamRepository.getById(id);
    if (!team) {
      throw notFound('There is no team with such id!');
    }
    return team;
  }

  public async getLeaderboard(type: string): Promise<Leaderboard[]> {
    const teams = await this.teamRepository.getLeaderboard(type);
    return teams;
  }
}
