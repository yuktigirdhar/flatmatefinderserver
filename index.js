'use strict'; 
const express = require('express'); 
const mongoose = require('mongoose'); 
const morgan = require('morgan'); 
const cors = require('cors'); 
const passport = require('passport'); 
const cloudinary = require('cloudinary');
const { PORT, CLIENT_ORIGIN, DATABASE_URL, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = require('./config');
const { router: usersRouter } = require('./users'); 
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth');
const { router: chatRouter } = require('./chat');
const { router: apartmentsRouter } = require('./apartments');

const app = express(); 

cloudinary.config({ 
  cloud_name: CLOUDINARY_CLOUD_NAME, 
  api_key: CLOUDINARY_API_KEY, 
  api_secret: CLOUDINARY_API_SECRET 
});

mongoose.Promise = global.Promise; 

passport.use(localStrategy); 
passport.use(jwtStrategy); 

app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
); 

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

app.use('/api/users/', usersRouter);
app.use('/api/auth/', authRouter); 
app.use('/api/chat/', chatRouter);
app.use('/api/apartments/', apartmentsRouter);


app.get('/test', (req, res) => {
  return res.json({message: 'IT CHANGED'}); 
});

let server; 
function runServer() {
  return new Promise((resolve, reject) => {
    mongoose.connect(DATABASE_URL, err => {
      if(err) {
        return reject(err);
      }
      server = app.listen(PORT, () => {
        console.log(`The application is listening on port ${PORT}`);
        resolve(); 
      })
        .on('error', err => {
          mongoose.disconnect(); 
          reject(err); 
        }); 
    }); 
  }); 
}


function closeServer() {
  return mongoose.disconnect().then(() => {
    return new PromiseProvider((resolve, reject) => {
      console.log('Closing server'); 
      server.close(err => {
        if(err){
          return reject(err); 
        }
        resolve(); 
      });
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer }; 


