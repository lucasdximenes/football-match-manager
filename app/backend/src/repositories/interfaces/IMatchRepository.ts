import {
  newMatchBody,
  Matches,
  updateMatchBody,
} from '../../interfaces/Match.interface';
import Match from '../../database/models/Match';

export default interface IMatchRepository {
  getAll(): Promise<Matches[]>;
  getById(id: number): Promise<Match | null>;
  getByProgress(progress: boolean): Promise<Matches[]>;
  createMatch(match: newMatchBody): Promise<Match>;
  finishMatch(matchId: number): Promise<void>;
  updateMatchGoals(
    matchId: number,
    matchUpdate: updateMatchBody,
  ): Promise<Match>;
}
