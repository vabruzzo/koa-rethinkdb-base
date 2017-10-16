const Router = require('koa-router');

const Quote = require('./quoteModel');

const router = new Router();
const BASE_URL = `/api/v1/quotes`;

router.get(BASE_URL, async ctx => {
  try {
    const quotes = await Quote.all(ctx.db);
    ctx.body = {
      status: 'success',
      data: quotes,
    };
  } catch (err) {
    ctx.throw(err);
  }
});

router.get(`${BASE_URL}/:id`, async ctx => {
  try {
    const quote = await Quote.get(ctx.db, ctx.params.id);
    if (!quote) {
      throw new Error('The requested resource does not exist.');
    }
    ctx.body = {
      status: 'success',
      data: [quote],
    };
  } catch (err) {
    ctx.status = 404;
    ctx.body = {
      error: err.message,
    };
  }
});

router.post(`${BASE_URL}`, async ctx => {
  try {
    const quote = await Quote.create(ctx.db, ctx.request.body);
    if (!quote) {
      throw new Error('Something went wrong.');
    }
    ctx.status = 201;
    ctx.body = {
      status: 'success',
      data: [quote],
    };
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      error: err.message,
    };
  }
});

router.put(`${BASE_URL}/:id`, async ctx => {
  try {
    const quote = await Quote.update(ctx.db, ctx.params.id, ctx.request.body);
    if (!quote) {
      throw new Error('The requested resource does not exist.');
    }
    ctx.body = {
      status: 'success',
      data: [quote],
    };
  } catch (err) {
    ctx.status = 404;
    ctx.body = {
      error: err.message,
    };
  }
});

router.delete(`${BASE_URL}/:id`, async ctx => {
  try {
    const deletedQuote = await Quote.delete(ctx.db, ctx.params.id);
    if (!deletedQuote) {
      throw new Error('The requested resource does not exist.');
    }
    ctx.body = {
      status: 'success',
      data: [deletedQuote],
    };
  } catch (err) {
    ctx.status = 404;
    ctx.body = {
      error: err.message,
    };
  }
});

module.exports = router;
