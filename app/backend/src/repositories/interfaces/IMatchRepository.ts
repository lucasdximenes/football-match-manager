import Match from '../../database/models/Match';

export default interface IMatchRepository {
  getAll(): Promise<Match[]>;
}
