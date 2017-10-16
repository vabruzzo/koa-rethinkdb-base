const request = require('supertest');
const r = require('rethinkdbdash')({ silent: true });

const server = require('../../app').listen();

const BASE_URL = `/api/v1/quotes`;

beforeEach(async () => {
  await r.tableCreate('quotes');
  await r
    .table('quotes')
    .insert([
      { author: 'test1', content: 'content1' },
      { author: 'test2', content: 'content2' },
      { author: 'test3', content: 'content3' },
    ]);
});

afterEach(async () => {
  await r.tableDrop('quotes');
});

describe('api/index/quotes', () => {
  describe('GET /', () => {
    test('get all', async () => {
      const response = await request(server).get(BASE_URL);

      expect(response.status).toEqual(200);
      expect(response.type).toEqual('application/json');
      expect(response.body.data.length).toEqual(3);
    });
  });

  describe('GET /:id', () => {
    test('get single by id', async () => {
      const response = await request(server).get(BASE_URL);
      const quote = response.body.data[0];
      const fetchedQuote = await request(server).get(`${BASE_URL}/${quote.id}`);

      expect(response.status).toEqual(200);
      expect(response.type).toEqual('application/json');
      expect(fetchedQuote.body.data[0]).toEqual(quote);
    });

    test('get single 404', async () => {
      const response = await request(server).get(`${BASE_URL}/0`);

      expect(response.status).toEqual(404);
      expect(response.type).toEqual('application/json');
    });
  });

  describe('POST /:id', () => {
    test('create', async () => {
      const quote = {
        author: 'test-1',
        content: 'content-1',
      };
      const response = await request(server)
        .post(BASE_URL)
        .send(quote);
      const createdQuote = response.body.data[0];

      expect(response.status).toEqual(201);
      expect(response.type).toEqual('application/json');
      expect(createdQuote.author).toEqual(quote.author);
      expect(createdQuote.content).toEqual(createdQuote.content);
    });
  });

  describe('PUT /', () => {
    test('update by id', async () => {
      const quote = {
        author: 'test-2',
        content: 'content-2',
      };
      const quoteUpdate = {
        author: 'test-3',
        content: 'content-3',
      };
      const response = await request(server)
        .post(BASE_URL)
        .send(quote);
      const createdQuote = response.body.data[0];
      const updatedResponse = await request(server)
        .put(`${BASE_URL}/${createdQuote.id}`)
        .send(quoteUpdate);
      const updatedQuote = updatedResponse.body.data[0];

      expect(updatedResponse.status).toEqual(200);
      expect(updatedResponse.type).toEqual('application/json');
      expect(updatedQuote.author).toEqual(quoteUpdate.author);
      expect(updatedQuote.content).toEqual(quoteUpdate.content);
    });

    test('update 400', async () => {
      const quoteUpdate = {
        author: 'test-4',
        content: 'content-4',
      };
      const response = await request(server)
        .put(`${BASE_URL}/0`)
        .send(quoteUpdate);

      expect(response.status).toEqual(404);
      expect(response.type).toEqual('application/json');
    });
  });

  describe('DELETE /:id', () => {
    test('delete by id', async () => {
      const quote = {
        author: 'test-5',
        content: 'content-5',
      };
      const response = await request(server)
        .post(BASE_URL)
        .send(quote);
      const createdQuote = response.body.data[0];
      const deletedResponse = await request(server).delete(
        `${BASE_URL}/${createdQuote.id}`
      );

      const deletedQuote = deletedResponse.body.data[0];

      expect(deletedResponse.status).toEqual(200);
      expect(deletedResponse.type).toEqual('application/json');
      expect(deletedQuote.author).toEqual(createdQuote.author);
      expect(deletedQuote.content).toEqual(createdQuote.content);
    });

    test('delete 404', async () => {
      const response = await request(server).delete(`${BASE_URL}/0`);

      expect(response.status).toEqual(404);
      expect(response.type).toEqual('application/json');
    });
  });
});
