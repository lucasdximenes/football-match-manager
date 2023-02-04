import Team from '../../database/models/Team';
import ITeamRepository from '../interfaces/ITeamRepository';

export default class TeamRepository implements ITeamRepository {
  constructor(private teamModel: typeof Team) {}

  public async getAll(): Promise<Team[]> {
    const teams = await this.teamModel.findAll();
    return teams;
  }
}
