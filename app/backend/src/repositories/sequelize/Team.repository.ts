import Team from '../../database/models/Team';
import ITeamRepository from '../interfaces/ITeamRepository';

export default class TeamRepository implements ITeamRepository {
  constructor(private teamModel: typeof Team) {}

  public async getAll(): Promise<Team[]> {
    const teams = await this.teamModel.findAll();
    return teams;
  }

  public async getById(id: number): Promise<Team | null> {
    const team = await this.teamModel.findByPk(id);
    return team;
  }
}
