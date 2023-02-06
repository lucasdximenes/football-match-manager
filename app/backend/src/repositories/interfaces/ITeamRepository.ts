import Leaderboard from '../../interfaces/Leaderboard.interface';
import Team from '../../database/models/Team';

export default interface ITeamRepository {
  getAll(): Promise<Team[]>;
  getById(id: number): Promise<Team | null>;
  getLeaderboard(type: string): Promise<Leaderboard[]>;
}
