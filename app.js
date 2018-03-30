require('./config/config');
require('./global_functions');

console.log('Environment: ', CONFIG.app);

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');


const app = express();


// Log request to console
app.use(logger('dev'));


// Check database
const models = require('./models');
models.sequelize.authenticate()
  .then(() => console.log('Connected to SQL db: ', CONFIG.db.database))
  .catch((err) => console.error('Unable to connect to SQL db: ', CONFIG.db.database, err))

if (CONFIG.app === 'dev') {
  models.sequelize.sync(); // create db if not exists
  // models.sequelize.sync({ force: true }); // reset db for new testing/development run
}


// load routes
const v1 = require('./routes/v1');
app.use('/v1', v1);


// parse requests params
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, Content-Type');
  // Set to true if you need the website to include cookies
  // in the requests sent to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

app.use(passport.initialize());


app.use('/', (req,res) => {
  res.status(200).send({
    status: 'success', message: 'Hello from API server!'
  });
});


// 404 catcher
app.use((res, req, next) => {
  let err = new Error('Not Found');
  err.status = 404;

  next(err);
});

// error handler
app.use((err, req, res, next) => {
  errorResp(res, err, err.status || 590);

  //res.locals.message = err.message;
  // only provide error on dev mode
  //res.locals.error = req.app.get('env') === 'development' ? err : {};

  //res.status(err.status || 590);
  //res.render('error');
});


module.exports = app;
