import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';

export default class Match extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Match.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    homeTeamId: {
      type: INTEGER,
      allowNull: false,
    },
    homeTeamGoals: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    awayTeamId: {
      type: INTEGER,
      allowNull: false,
    },
    awayTeamGoals: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    inProgress: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize: db,
    tableName: 'matches',
    timestamps: false,
    underscored: true,
  },
);
