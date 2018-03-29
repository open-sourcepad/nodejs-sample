var express = require('express');
var app = express();


app.get('/', (req, res) => {
  res.send('hello home');
});

app.get('/index.html', (req, res) => {
  res.sendFile(__dirname + '/index.html')
});

app.all('/secret', (req, res, next) => {
  console.log('secret route found ...');
  next();
}, (req, res) => {
  res.send('Suprise!')
});

app.listen(3000, () => console.log('Listening on port 3000'));
