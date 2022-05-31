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
  const api_key = "api key";
  const domain = 'domain';
  const mg = mailgun({apiKey: api_key, domain: domain,host: "api.mailgun.net"});

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


