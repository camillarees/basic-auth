'use strict';

const basicAuth = require('../src/auth/middleware/basic');
const { sequelize, UsersModel } = require('../src/auth/models');

let user = {
  username: 'tester',
  password: 'pass',
};

beforeAll(async () => {
  await sequelize.sync();
  await UsersModel.create(user);
});

afterAll(async () => {
  await sequelize.drop();
});

describe('basic auth middleware', () => {
  it('fails on signin as expected', () => {
    let req = {
      headers: {
        authorization: 'basic auth',
      },
    };
    let res = {};
    let next = jest.fn();

    basicAuth(req, res, next)
      .then(() => {
        expect(next).toHaveBeenCalledWith('Invalid User');
      });
  });
});



