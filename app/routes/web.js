/**
 * Created by ntutikyan on 04.09.2017.
 */
const routes = require('express').Router();

routes.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected!' });
});

routes.get('/another', (req, res) => {
    res.status(200).json({ message: 'Connected! to another' });
});

module.exports = routes;
