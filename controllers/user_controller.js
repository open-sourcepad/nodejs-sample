const User = require('../models').User;
const authService = require('./../services/auth_service');

const create = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const data = req.body;

  if (!data.username) return errorResp(res, 'Must provide a username');
  if (!data.password) return errorResp(res, 'Must provide a password');

  let err, obj;
  [err, obj] = await to(authService.createUser(data));
  if (err) return errorResp(res, err,  422);

  return successResp(res, {
    message: 'Successfull created a new user.',
    token: obj.getJWT(),
    user: obj.toWeb()
  }, 201);
};
module.exports.create = create;


const login = async (req, res) => {
  const body = req.body;
  let err, obj;

  [err, obj] = await to(authService.authUser(req.body));
  if (err) return errorResp(res, err, 422);

  return successResp(res, {
    token: obj.getJWT(),
    user: obj.toWeb()
  });
};
module.exports.login = login;
