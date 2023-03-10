import {
  Matches,
  newMatchBody,
  updateMatchBody,
} from '../../interfaces/Match.interface';
import Match from '../../database/models/Match';

export default interface IMatchServices {
  getAll(): Promise<Matches[]>;
  getByProgress(progress: boolean): Promise<Matches[]>;
  createMatch(match: newMatchBody): Promise<Match>;
  finishMatch(matchId: number): Promise<void>;
  updateMatchGoals(
    matchId: number,
    matchUpdate: updateMatchBody,
  ): Promise<Match | void>;
}
