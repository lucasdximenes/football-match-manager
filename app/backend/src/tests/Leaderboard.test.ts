import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import sequelize from '../database/models';
import Leaderboard from '../interfaces/Leaderboard.interface';

chai.use(chaiHttp);

const { expect } = chai;

const leaderBoardMock: Leaderboard[] = [
  {
    name: 'Team 1',
    totalPoints: 3,
    totalGames: 1,
    totalVictories: 1,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 3,
    goalsOwn: 1,
    goalsBalance: 2,
    efficiency: 3,
  },
  {
    name: 'Team 2',
    totalPoints: 0,
    totalGames: 1,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 1,
    goalsFavor: 1,
    goalsOwn: 3,
    goalsBalance: -2,
    efficiency: 0,
  },
];

describe('GET /leaderboard', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should return status 200 and a list of teams', async () => {
    sinon.stub(sequelize, 'query').resolves(leaderBoardMock as any);

    const res = await chai.request(app).get('/leaderboard');

    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
  });
});

describe('GET /leaderboard/home', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should return status 200 and a list of teams', async () => {
    sinon.stub(sequelize, 'query').resolves(leaderBoardMock as any);

    const res = await chai.request(app).get('/leaderboard/home');

    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
  });
});

describe('GET /leaderboard/away', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should return status 200 and a list of teams', async () => {
    sinon.stub(sequelize, 'query').resolves(leaderBoardMock as any);

    const res = await chai.request(app).get('/leaderboard/away');

    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
  });
});
