import * as chai from 'chai';
import * as sinon from 'sinon';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import User from '../database/models/User';

chai.use(chaiHttp);

const { expect } = chai;

const userMock = {
  id: 1,
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
  // password: secret_admin
};

describe('POST /login', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should return status 200 and a token', async () => {
    sinon.stub(User, 'findOne').resolves(userMock as User);
    sinon.stub(jwt, 'sign').resolves('token');

    const res = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin',
    });

    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property('token');
  });

  it('Should return bad request when email or password is missing', async () => {
    const res = await chai.request(app).post('/login').send({
      email: '',
      password: '',
    });

    expect(res.status).to.be.equal(400);
    expect(res.body).to.have.property('message');
  });

  it('Should return unauthorized when email is incorrect', async () => {
    sinon.stub(User, 'findOne').resolves(null);

    const res = await chai.request(app).post('/login').send({
      email: 'email@email.com',
      password: 'password',
    });

    expect(res.status).to.be.equal(401);
    expect(res.body).to.have.property('message');
  });

  it('Should return unauthorized when password is incorrect', async () => {
    sinon.stub(User, 'findOne').resolves(userMock as User);
    sinon.stub(bcrypt, 'compare').resolves(false);

    const res = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'password',
    });

    expect(res.status).to.be.equal(401);
    expect(res.body).to.have.property('message');
  });
});

describe('GET /login/validate', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Should return status 200 and a role', async () => {
    sinon.stub(jwt, 'verify').resolves({ id: 1 });
    sinon.stub(User, 'findByPk').resolves(userMock as User);

    const res = await chai
      .request(app)
      .get('/login/validate')
      .set('Authorization', 'Bearer token');

    expect(res.status).to.be.equal(200);
    expect(res.body).to.have.property('role');
  });

  it('Should return bad request when token is missing', async () => {
    const res = await chai.request(app).get('/login/validate');

    expect(res.status).to.be.equal(400);
    expect(res.body).to.have.property('message');
  });

  it('Should return unauthorized when token is invalid', async () => {
    sinon.stub(jwt, 'verify').throws();

    const res = await chai
      .request(app)
      .get('/login/validate')
      .set('Authorization', 'Bearer token');

    expect(res.status).to.be.equal(401);
    expect(res.body).to.have.property('message');
  });

  it('Should return unauthorized when user is not found', async () => {
    sinon.stub(jwt, 'verify').resolves({ id: 1 });
    sinon.stub(User, 'findByPk').resolves(null);

    const res = await chai
      .request(app)
      .get('/login/validate')
      .set('Authorization', 'Bearer token');

    expect(res.status).to.be.equal(401);
    expect(res.body).to.have.property('message');
  });
});
