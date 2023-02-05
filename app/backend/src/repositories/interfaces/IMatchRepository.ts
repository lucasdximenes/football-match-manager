import Matches from '../../interfaces/Match.interface';

export default interface IMatchRepository {
  getAll(): Promise<Matches[]>;
  getByProgress(progress: boolean): Promise<Matches[]>;
}
