import Team from '../../database/models/Team';

export default interface ITeamServices {
  getAll(): Promise<Team[]>;
  getById(id: number): Promise<Team | null>;
}
