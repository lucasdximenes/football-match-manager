import Team from '../../database/models/Team';
import Leaderboard from '../../interfaces/Leaderboard.interface';

export default interface ITeamServices {
  getAll(): Promise<Team[]>;
  getById(id: number): Promise<Team | null>;
  getLeaderboard(type: string): Promise<Leaderboard[]>;
}
