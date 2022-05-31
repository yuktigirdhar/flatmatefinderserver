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
    User.find({ looking_for: 'fill_a_room' })
        .then(users => res.json(users.map(user => user.apiRepr())));
});

module.exports = { router };
