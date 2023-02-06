import * as chai from 'chai';
import * as sinon from 'sinon';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Match from '../database/models/Match';
import { Matches } from '../interfaces/Match.interface';

chai.use(chaiHttp);

const { expect } = chai;

const matchesMock = [
  {
    id: 41,
    homeTeamId: 16,
    homeTeamGoals: 2,
    awayTeamId: 9,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      teamName: 'São Paulo',
    },
    awayTeam: {
      teamName: 'Internacional',
    },
  },
  {
    id: 42,
    homeTeamId: 6,
    homeTeamGoals: 1,
    awayTeamId: 1,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      teamName: 'Ferroviária',
    },
    awayTeam: {
      teamName: 'Avaí/Kindermann',
    },
  },
];

describe('GET /matches', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should return status 200 and a list of matches', async () => {
    sinon.stub(Match, 'findAll').resolves(matchesMock as Matches[]);

    const res = await chai.request(app).get('/matches');

    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
  });
});

describe('GET /matches?inProgress', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should return status 200 and a list of matches in progress', async () => {
    sinon.stub(Match, 'findAll').resolves(matchesMock as Matches[]);

    const res = await chai.request(app).get('/matches?inProgress=true');

    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('should return bad request if inProgress is not a boolean', async () => {
    const res = await chai.request(app).get('/matches?inProgress=abc');

    expect(res.status).to.be.equal(400);
  });
});
