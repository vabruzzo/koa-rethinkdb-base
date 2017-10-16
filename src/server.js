const app = require('./app');

const PORT = process.env.PORT || 1337;

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;
