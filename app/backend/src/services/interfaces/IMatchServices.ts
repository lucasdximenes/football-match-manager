import Matches from '../../interfaces/Match.interface';

export default interface IMatchServices {
  getAll(): Promise<Matches[]>;
  getByProgress(progress: boolean): Promise<Matches[]>;
}
