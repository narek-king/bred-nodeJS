/**
 * Created by ntutikyan on 31.08.2017.
 */
const routes = require('express').Router();
const api = require('./api');
const web = require('./web');


routes.use('/api', api);
routes.use('/', web);
module.exports = routes;
