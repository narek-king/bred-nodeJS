/**
 * Created by ntutikyan on 05.08.2017.
 */

const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

const LoafSchema   = new Schema({
    text: String,
    date: String,
    title: String,
    bQuot: String,
    bInYear: String,
    sQuot: String
});

module.exports = mongoose.model('Loaf', LoafSchema);