/**
 * Created by ntutikyan on 05.08.2017.
 */
const express = require('express');
const router = express.Router();
const Loaf = require('../models/loaf');

router.route('/loafs')

// create a loaf (accessed at POST http://localhost:8080/loafs)
    .post( (req, res) => {

        let loaf = new Loaf();		// create a new instance of the Loaf model
        loaf.title = req.body.title;  // set the loafs name (comes from the request)

        loaf.save((err) => {
            if (err)
                res.send(err);

            res.json({ message: 'Loaf created!' });
        });


    })

    // get all the loafs (accessed at GET http://localhost:8080/api/loafs)
    .get((req, res) => {
        Loaf.find((err, loafs) => {
            if (err)
                res.send(err);

            res.json(loafs);
        });
    });

// on routes that end in /loafs/:loaf_id
// ----------------------------------------------------
router.route('/:loaf_id')

// get the loaf with that id
    .get((req, res) => {
        Loaf.findById(req.params.loaf_id, (err, loaf) => {
            if (err)
                res.send(err);
            res.json(loaf);
        });
    })

    // update the loaf with this id
    .put((req, res) => {
        Loaf.findById(req.params.loaf_id, (err, loaf) => {

            if (err)
                res.send(err);

            loaf.title = req.body.title;
            loaf.save((err) => {
                if (err)
                    res.send(err);

                res.json({ message: 'Loaf updated!' });
            });

        });
    })

    // delete the loaf with this id
    .delete((req, res) => {
        Loaf.remove({
            _id: req.params.loaf_id
        }, (err, loaf) =>{
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

module.exports = router;