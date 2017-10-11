const Koa = require("koa");
const bodyParser = require("koa-bodyparser");

const app = new Koa();
const PORT = process.env.PORT || 1337;

app.use(bodyParser());

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;
