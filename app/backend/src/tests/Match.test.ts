import * as chai from 'chai';
import * as sinon from 'sinon';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Match from '../database/models/Match';
import Team from '../database/models/Team';
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

describe('POST /matches', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should return status 201 and the created match', async () => {
    const newMatch = {
      homeTeamId: 16,
      homeTeamGoals: 2,
      awayTeamId: 9,
      awayTeamGoals: 0,
    };

    sinon.stub(jwt, 'verify').resolves(true);

    sinon
      .stub(Team, 'findByPk')
      .onFirstCall()
      .resolves({ id: 16, teamName: 'Team 16' } as Team)
      .onSecondCall()
      .resolves({ id: 9, teamName: 'Team 9' } as Team);

    sinon
      .stub(Match, 'create')
      .resolves({ inProgress: true, ...newMatch } as Match);

    const res = await chai
      .request(app)
      .post('/matches')
      .set('Authorization', 'Bearer 123456')
      .send(newMatch);

    expect(res.status).to.be.equal(201);
    expect(res.body).to.be.an('object');
  });

  it('Should return a bad request if some field is missing', async () => {
    const newMatch = {
      homeTeamId: 16,
      homeTeamGoals: 2,
      awayTeamGoals: 0,
    };

    sinon.stub(jwt, 'verify').resolves(true);

    const res = await chai
      .request(app)
      .post('/matches')
      .set('Authorization', 'Bearer 123456')
      .send(newMatch);

    expect(res.status).to.be.equal(400);
  });

  it('Should return a bad request if some field is invalid', async () => {
    const newMatch = {
      homeTeamId: 16,
      homeTeamGoals: 2,
      awayTeamId: 9,
      awayTeamGoals: 'abc',
    };

    sinon.stub(jwt, 'verify').resolves(true);

    const res = await chai
      .request(app)
      .post('/matches')
      .set('Authorization', 'Bearer 123456')
      .send(newMatch);

    expect(res.status).to.be.equal(400);
  });

  it('Should return a bad data if homeTeamId is equal to awayTeamId', async () => {
    const newMatch = {
      homeTeamId: 16,
      homeTeamGoals: 2,
      awayTeamId: 16,
      awayTeamGoals: 0,
    };

    sinon.stub(jwt, 'verify').resolves(true);

    const res = await chai
      .request(app)
      .post('/matches')
      .set('Authorization', 'Bearer 123456')
      .send(newMatch);

    expect(res.status).to.be.equal(422);
  });
});

describe('PATCH /matches/:id', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Should return a badRequest if the id is not a number', async () => {
    sinon.stub(jwt, 'verify').resolves(true);

    const res = await chai
      .request(app)
      .patch('/matches/abc')
      .set('Authorization', 'Bearer 123456')
      .send({ homeTeamGoals: 2, awayTeamGoals: 0 });

    expect(res.status).to.be.equal(400);
  });

  it('Should return a badRequest if some field is missing', async () => {
    sinon.stub(jwt, 'verify').resolves(true);

    const res = await chai
      .request(app)
      .patch('/matches/1')
      .set('Authorization', 'Bearer 123456')
      .send({ homeTeamGoals: 2 });

    expect(res.status).to.be.equal(400);
  });

  it('Should return a badRequest if some field is invalid', async () => {
    sinon.stub(jwt, 'verify').resolves(true);

    const res = await chai
      .request(app)
      .patch('/matches/1')
      .set('Authorization', 'Bearer 123456')
      .send({ homeTeamGoals: 2, awayTeamGoals: 'abc' });

    expect(res.status).to.be.equal(400);
  });

  it('Should return a notFound if the match does not exist', async () => {
    sinon.stub(jwt, 'verify').resolves(true);

    sinon.stub(Match, 'findByPk').resolves(null);

    const res = await chai
      .request(app)
      .patch('/matches/1')
      .set('Authorization', 'Bearer 123456')
      .send({ homeTeamGoals: 2, awayTeamGoals: 0 });

    expect(res.status).to.be.equal(404);
  });

  it('Should return a badData if the match is already finished', async () => {
    sinon.stub(jwt, 'verify').resolves(true);

    sinon.stub(Match, 'findByPk').resolves({ inProgress: false } as Match);

    const res = await chai
      .request(app)
      .patch('/matches/1')
      .set('Authorization', 'Bearer 123456')
      .send({ homeTeamGoals: 2, awayTeamGoals: 0 });

    expect(res.status).to.be.equal(422);
  });

  it('Should return a updated match', async () => {
    sinon.stub(jwt, 'verify').resolves(true);

    sinon.stub(Match, 'update').resolves([1]);
    sinon
      .stub(Match, 'findByPk')
      .onFirstCall()
      .resolves({ inProgress: true } as Match)
      .onSecondCall()
      .resolves({} as Match);

    const res = await chai
      .request(app)
      .patch('/matches/1')
      .set('Authorization', 'Bearer 123456')
      .send({ homeTeamGoals: 2, awayTeamGoals: 1 });

    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
  });
});

describe('PATCH /matches/:id/finish', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Should return a notFound if the match does not exist', async () => {
    sinon.stub(jwt, 'verify').resolves(true);

    sinon.stub(Match, 'findByPk').resolves(null);

    const res = await chai
      .request(app)
      .patch('/matches/1/finish')
      .set('Authorization', 'Bearer 123456');

    expect(res.status).to.be.equal(404);
  });

  it('Should return a badData if the match is already finished', async () => {
    sinon.stub(jwt, 'verify').resolves(true);

    sinon.stub(Match, 'findByPk').resolves({ inProgress: false } as Match);

    const res = await chai
      .request(app)
      .patch('/matches/1/finish')
      .set('Authorization', 'Bearer 123456');

    expect(res.status).to.be.equal(422);
  });

  it('Should return a finished', async () => {
    sinon.stub(jwt, 'verify').resolves(true);

    sinon.stub(Match, 'update').resolves([1]);
    sinon.stub(Match, 'findByPk').resolves({ inProgress: true } as Match);

    const res = await chai
      .request(app)
      .patch('/matches/1/finish')
      .set('Authorization', 'Bearer 123456');

    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
  });
});
