const Router = require('koa-router');

const router = new Router();
const BASE_URL = `/api/v1/quotes`;

const quoteController = require('./quoteController');

const respond = require('../../util/respond');

router.get(BASE_URL, quoteController.index, respond);
router.get(`${BASE_URL}/:id`, quoteController.show, respond);

router.post(`${BASE_URL}`, quoteController.create, respond);
router.put(`${BASE_URL}/:id`, quoteController.update, respond);
router.delete(`${BASE_URL}/:id`, quoteController.delete, respond);

module.exports = router;
