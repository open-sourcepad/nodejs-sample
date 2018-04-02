//parses error so you can read error message and handle them accordingly
parseError = require('parse-error');


// global function that will help use handle promise rejections,
// this article talks about it http://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/
to = (promise) => {
  return promise
    .then(data => [null, data])
    .catch(err => [parseError(err)]);
};


throwError = (msg, log) => {
  if (log) console.error(msg);
  throw new Error(msg);
};


errorResp = (res, err, code) => {
  if (typeof err == 'object' && typeof err.message != 'undefined') {
    err = err.message;
  }

  if (typeof code !== 'undefined') res.statusCode = code;

  return res.send({ success: false, error: err });
}

successResp = (res, data, code) => {
  let json = { success: true };

  if (typeof data == 'object') json = Object.assign(data, json); // merge
  if (typeof code !== 'undefined') res.statusCode = code;

  return res.send(json)
};


debugPrint = (obj) => {
  console.log('=========DEBUG PRINT=========');
  for (let key in obj) {
    console.log(key, ' -> ', obj[key]);
  }
  console.log('========/DEBUG PRINT=========');
};


//This is here to handle all the uncaught promise rejections
process.on('unhandledRejection', err => console.error('Uncaught Error', parseError(err)));
