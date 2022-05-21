'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const { User } = require('../users/models');
const router = express.Router();
const jsonParser = bodyParser.json();
const config = require('../config');
const mailgun = require("mailgun-js");

router.post('/', jsonParser, (req, res) => {
  console.log(req.body);
  const api_key = "329445b33c84c33866406a84aa4b76ef-5e7fba0f-919bf1ae";
  const domain = 'sandboxc4716665f63949b2bc28af324d76c505.mailgun.org';
  const mg = mailgun({apiKey: api_key, domain: domain});

  let data = {
    from: req.body.senderEmail,
    to: req.body.receiverEmail,
    subject: `Message from Roommate Finder`,
    text:  
     `You have received a new message from Roommate Finder.
       Email: ${req.body.senderEmail}
       Message:
       ${req.body.message}`
  };
   
  mg.messages().send(data, function (error, body) {
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


