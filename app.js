const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const dbConfig = require('./server/config/config');
const app = express();


// Log request to console
app.use(logger('dev'));


// Check database
const models = require('./server/models');
models.sequelize.sync()
  .then(() => console.log('Database looks fine'))
  .catch((err) => console.error('ERROR on database connection: ', err))


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());


// load routes
require('./server/routes')(app);
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning...'
}));


module.exports = app;
