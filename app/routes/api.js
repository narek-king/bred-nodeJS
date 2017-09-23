/**
 * Created by ntutikyan on 05.08.2017.
 */
const express = require('express');
const router = express.Router();
const loafController = require('../controller/loaf-controller');

router.route('/loaf')
    .post(loafController.store)
    .get(loafController.index);
router.route('/loaf/:loaf_id')
    .get(loafController.show)
    .put(loafController.update)
    .delete(loafController.destroy);

module.exports = router;