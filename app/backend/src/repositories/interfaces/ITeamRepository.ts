import Team from '../../database/models/Team';

export default interface ITeamRepository {
  getAll(): Promise<Team[]>;
}
