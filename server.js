/**
 * Created by ntutikyan on 05.08.2017.
 */

'use strict';
// call the packages we need
const express    = require('express');
const bodyParser = require('body-parser');
const app        = express();
const morgan     = require('morgan');
const mongoose   = require('mongoose');
const routes    = require('./app/routes/index');


mongoose.connect('mongodb://localhost:27017/bread'); // connect to our database

const port = process.env.PORT || 8081; // set our port

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTES FOR OUR API
// =============================================================================

// create our router
const router = express.Router();

// middleware to use for all requests
router.use((req, res, next) => {
    // do logging
    console.log('Something is happening.');
    next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)


// on routes that end in /bears
// ----------------------------------------------------
app.use('/', routes);

// REGISTER OUR ROUTES -------------------------------


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);