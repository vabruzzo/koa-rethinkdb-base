// external imports
const Koa = require('koa');
const r = require('rethinkdbdash');
const bodyParser = require('koa-bodyparser');

// internal imports
const indexRoutes = require('./domains/index/indexRoutes');
const quoteRoutes = require('./domains/quote/quoteRoutes');

// init server
const app = new Koa();

// init db connection pool & make available to app via context prototype.
// access db pool in middleware via ctx.db - the parameter in our db/model
// queries is named r
app.context.db = r({ silent: true });

// middlewares
app.use(bodyParser());
app.use(indexRoutes.routes());
app.use(quoteRoutes.routes());

module.exports = app;
