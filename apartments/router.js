'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const { User } = require('./models');
const router = express.Router();
const jsonParser = bodyParser.json();
const cloudinary = require('cloudinary');
const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', { session: false });


router.get('/:status', jsonParser, (req, res) => {
    User.findOne({ looking_for: req.params.status })
        .then(user => {
            res.json(user.apiRepr());
        });
});

router.get('/', jsonParser, (req, res) => {
    User.find()
        .then(users => {

                let myusers = users.map( user => user.apiRepr() )
                myusers = myusers.filter( function (e) {
                    console.log(e.address)
                    return e.address!==undefined && e.address!=="" && e.address!=null
                })
                res.json(myusers)
            }
        );
});

module.exports = { router };
