const express = require('express');
const Loaf = require('../models/loaf');

module.exports = {
    index: (req, res) => {
        Loaf.find({}, '_id date', (err, loafs) => {
            if (err)
                res.send(err);
            res.json(loafs);
        });
    },

    store: (req, res) => {
        let loaf = new Loaf();		// create a new instance of the Loaf model
        loaf.title = req.body.title;  // set the loafs name (comes from the request)

        loaf.save((err) => {
            if (err)
                res.send(err);
            res.json({message: 'Loaf created!'});
        });
    },

    show: (req, res) => {
        Loaf.findById(req.params.loaf_id, (err, loaf) => {
            if (err)
                res.send(err);
            res.json(loaf);
        });
    },

    update: (req, res) => {
        Loaf.findById(req.params.loaf_id, (err, loaf) => {
            if (err)
                res.send(err);
            loaf.title = req.body.title;
            loaf.save((err) => {
                if (err)
                    res.send(err);
                res.json({message: 'Loaf updated!'});
            });
        });
    },

    destroy: (req, res) => {
        Loaf.remove({
            _id: req.params.loaf_id
        }, (err, loaf) => {
            if (err)
                res.send(err);
            res.json({message: 'Successfully deleted'});
        });
    }
}