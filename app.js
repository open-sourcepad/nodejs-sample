var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var dbConfig = require('./config/db.config');
var app = express();

/**
 * Setup database
 */
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url);

mongoose.connection.on('error', () => {
  console.error('Could not connect to db. Terminating...');
  process.exit();
});

mongoose.connection.once('open', () => {
  console.log('Connected to db.');
});
// end of setup database


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.json({ message: 'Welcome to my app!' });
});


require('./app/routes/post.routes')(app);
app.listen(3000, () => console.log('Listening on port 3000'));
