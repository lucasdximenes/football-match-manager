import { newMatchBody, Matches } from '../../interfaces/Match.interface';
import Match from '../../database/models/Match';

export default interface IMatchRepository {
  getAll(): Promise<Matches[]>;
  getByProgress(progress: boolean): Promise<Matches[]>;
  createMatch(match: newMatchBody): Promise<Match>;
}
