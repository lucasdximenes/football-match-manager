import Team from '../database/models/Team';
import ITeamRepository from '../repositories/interfaces/ITeamRepository';
import ITeamServices from './interfaces/ITeamServices';

export default class TeamServices implements ITeamServices {
  constructor(private teamRepository: ITeamRepository) {}

  public async getAll(): Promise<Team[]> {
    const teams = await this.teamRepository.getAll();
    return teams;
  }
}
