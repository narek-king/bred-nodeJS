const express = require('express');
const Loaf = require('../models/loaf');
const moment = require('moment');

"use strict";

let armMonthToDigits = (month) => {
    switch (month){
        case 'Հուլիսի':
            return '07';
        case 'Օգոստոսի':
            return '08';
        case 'Սեպտեմբերի':
            return '09';
        default:
            return '00';
    }
};

module.exports = {
    index: (req, res) => {
        Loaf.find({}, '_id date title', (err, loafs) => {
            if (err)
                res.send(err);
            res.json(loafs);
        });
    },

    store: (req, res) => {
        let loaf = new Loaf();		// create a new instance of the Loaf model
        for (let key in req.body) {
            if (req.body.hasOwnProperty(key)){
                loaf[key] = req.body[key];
            }
        }
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
            for (let key in req.body) {
                if (req.body.hasOwnProperty(key)){
                    loaf[key] = req.body[key];
                }
            }
            // res.json(loaf);
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
    },

    normalizeDates: (req, res) => {
        //TODO check if the data is normalized already
        let year = req.body.year;
        Loaf.find({}, '_id date', (err, loafs) => {
            if (err)
                res.send(err);
            loafs.forEach((loaf, i) => {
                let dataArray = loaf.date.split(' ');
                loaf.date = moment(`${dataArray[3]}-${armMonthToDigits(dataArray[2])}-${year}`, 'DD-MM-YYYY').toDate();
                loaf.save((err) => {
                    if (err)
                        res.send(err);
                });
            });
            res.json(loafs);
        });
    }

};