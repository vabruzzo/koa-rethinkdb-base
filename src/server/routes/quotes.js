const Router = require('koa-router');

const Quote = require('../../db/model/Quote');

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
    ctx.throw(500);
  }
});

router.get(`${BASE_URL}/:id`, async ctx => {
  try {
    const quote = await Quote.get(ctx.db, ctx.params.id);
    if (quote) {
      ctx.body = {
        status: 'success',
        data: [quote],
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That quote does not exist.',
      };
    }
  } catch (err) {
    ctx.throw(500);
  }
});

router.post(`${BASE_URL}`, async ctx => {
  try {
    const quote = await Quote.create(ctx.db, ctx.request.body);
    if (quote) {
      ctx.status = 201;
      ctx.body = {
        status: 'success',
        data: [quote],
      };
    } else {
      ctx.status = 400;
      ctx.body = {
        status: 'error',
        message: 'Something went wrong.',
      };
    }
  } catch (err) {
    ctx.throw(500);
  }
});

router.put(`${BASE_URL}/:id`, async ctx => {
  try {
    const quote = await Quote.update(ctx.db, ctx.params.id, ctx.request.body);
    if (quote) {
      ctx.body = {
        status: 'success',
        data: [quote],
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That quote does not exist.',
      };
    }
  } catch (err) {
    ctx.throw(500);
  }
});

router.delete(`${BASE_URL}/:id`, async ctx => {
  try {
    const deletedQuote = await Quote.delete(ctx.db, ctx.params.id);
    if (deletedQuote) {
      ctx.status = 200;
      ctx.body = {
        status: 'success',
        data: [deletedQuote],
      };
    } else {
      ctx.status = 404;
      ctx.body = {
        status: 'error',
        message: 'That quote does not exist.',
      };
    }
  } catch (err) {
    ctx.throw(500);
  }
});

module.exports = router;
