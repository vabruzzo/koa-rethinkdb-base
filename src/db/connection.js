module.exports = (() => {
  switch (process.env.NODE_ENV) {
    case 'test':
      return { host: 'localhost', port: 28015, db: 'quotes_test' };
    case 'production':
      return {
        host: 'localhost',
        port: 28015,
        db: 'quotes_prod',
        user: process.env.DB_USER_PROD,
        password: process.env.DB_PASS_PROD,
      };
    case 'development':
    default:
      return { host: 'localhost', port: 28015, db: 'quotes_dev' };
  }
})();
