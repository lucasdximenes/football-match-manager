import Team from '../../database/models/Team';

export default interface ITeamServices {
  getAll(): Promise<Team[]>;
}
