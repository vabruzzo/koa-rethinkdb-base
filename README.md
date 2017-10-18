# Koa && Rethinkdb

Boilerplate for Koa/Rethinkdb apps with:
- Prettier for code formatting
- Jest & SuperTest for testing and code coverage

## Development

- Install [Rethinkdb](https://www.rethinkdb.com/docs/install/)
- Run `rethinkdb` and create a development database
- Run `npm run dev` to start the server via nodemon

## Production

- Create production database
- Run `npm start`

## Testing

- Create test database
- Run `npm test` to run Jest test suite
- Run `npm run coverage` to test and produce code coverage report. Report is served and URL is copied to clipboard automatically.

## Formatting

- Prefer `const` over `let` wherever possible
- Run prettier (`npm run format`) to format all files. Recommend using an editor plugin to format files on save.

