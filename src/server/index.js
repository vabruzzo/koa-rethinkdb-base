// external imports
const Koa = require('koa');
const r = require('rethinkdbdash');
const bodyParser = require('koa-bodyparser');

// internal imports
const indexRoutes = require('./routes/index');
const quoteRoutes = require('./routes/quotes');

// init server & port
const app = new Koa();
const PORT = process.env.PORT || 1337;

// init db connection pool & make available to app via context prototype.
// access db pool in middleware via ctx.db - the parameter in our db/model
// queries is named r
app.context.db = r();

// middlewares
app.use(bodyParser());
app.use(indexRoutes.routes());
app.use(quoteRoutes.routes());

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;
