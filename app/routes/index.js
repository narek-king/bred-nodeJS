/**
 * Created by ntutikyan on 31.08.2017.
 */
const routes = require('express').Router();


routes.use('/models', models);
routes.use('/cars', cars);

routes.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected!' });
});

module.exports = routes;
