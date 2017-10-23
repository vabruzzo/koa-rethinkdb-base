const Quote = require('./quoteModel');

const quoteController = {};

quoteController.index = async (ctx, next) => {
  const quotes = await Quote.all(ctx.db);
  ctx._locals.quotes = quotes;
  await next();
};

quoteController.show = async (ctx, next) => {
  try {
    const quote = await Quote.get(ctx.db, ctx.params.id);
    if (!quote) {
      throw new Error('The requested resource does not exist.');
    }
    ctx._locals.quote = [quote];
    await next();
  } catch (err) {
    ctx.status = 404;
    ctx.body = {
      error: err.message,
    };
  }
};

quoteController.create = async (ctx, next) => {
  try {
    const quote = await Quote.create(ctx.db, ctx.request.body);
    if (!quote.author) {
      throw new Error('Something went wrong.');
    }
    ctx.status = 201;
    ctx._locals.quote = [quote];
    await next();
  } catch (err) {
    ctx.status = 400;
    ctx.body = {
      error: err.message,
    };
  }
};

quoteController.update = async (ctx, next) => {
  try {
    const quote = await Quote.update(ctx.db, ctx.params.id, ctx.request.body);
    if (!quote) {
      throw new Error('The requested resource does not exist.');
    }
    ctx._locals.quote = [quote];
    await next();
  } catch (err) {
    ctx.status = 404;
    ctx.body = {
      error: err.message,
    };
  }
};

quoteController.delete = async (ctx, next) => {
  try {
    const deletedQuote = await Quote.delete(ctx.db, ctx.params.id);
    if (!deletedQuote) {
      throw new Error('The requested resource does not exist.');
    }
    ctx._locals.quote = [deletedQuote];
    await next();
  } catch (err) {
    ctx.status = 404;
    ctx.body = {
      error: err.message,
    };
  }
};

module.exports = quoteController;
