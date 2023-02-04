import { Model, INTEGER, STRING } from 'sequelize';
import Match from './Match';
import db from '.';

export default class Team extends Model {
  declare id: number;
  declare teamName: string;
}

Team.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    teamName: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'teams',
    timestamps: false,
    underscored: true,
  },
);

Team.hasMany(Match, {
  foreignKey: 'homeTeamId',
  as: 'homeTeam',
});
Team.hasMany(Match, {
  foreignKey: 'awayTeamId',
  as: 'awayTeam',
});

Match.belongsTo(Team, {
  foreignKey: 'homeTeamId',
  as: 'homeTeam',
});
Match.belongsTo(Team, {
  foreignKey: 'awayTeamId',
  as: 'awayTeam',
});
