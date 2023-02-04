import Match from '../../database/models/Match';

export default interface IMatchServices {
  getAll(): Promise<Match[]>;
}
