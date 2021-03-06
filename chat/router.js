'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const { User } = require('../users/models');
const router = express.Router();
const jsonParser = bodyParser.json();
const config = require('../config');
const mailgun = require("mailgun-js");

router.post('/', jsonParser, (req, res) => {
  const api_key = '';
  const domain = '';
  const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

  let data = {
    from: 'Flatmate Finder <flatmatefinderhome@gmail.com>',
    to: req.body.receiverEmail,
    subject: `Message from Bunk Up`,
    text:  
     `You have received a new message from Bunk Up.
       Email: ${req.body.senderEmail}
       Message:
       ${req.body.message}`
  };

  mailgun.messages().send(data, function (error, body) {
    console.log(error)
    console.log(body)
    if(!error) {
      res.send('Mail Sent');
    }
    else {
      res.send('There was a problem with Mailgun');
    }
  });
});


module.exports = { router }; 


