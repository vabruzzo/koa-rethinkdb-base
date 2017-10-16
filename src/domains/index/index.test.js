const request = require('supertest');

const server = require('../../app').listen();

describe('api/index', () => {
  test('index test', async () => {
    const response = await request(server).get('/');

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(typeof response.body.message).toBe('string');
    expect(response.body.message).toBe('koa rethinkdb base');
  });
});
