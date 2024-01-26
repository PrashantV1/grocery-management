const express = require('express');

const cors = require('cors');

const routes = require('./routes');
const ApiError = require('./utils/apiError');
const passport = require('passport');

const app = express();



app.use(express.json());




app.use(cors());
app.options('*', cors());
app.use(passport.initialize());

app.use('/v1', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  console.log("Reqqqqqq",req.url)
  next(new ApiError(400, 'Not found'));
});



module.exports = app;