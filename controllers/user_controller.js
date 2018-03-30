const User = require('../models').User;
const authService = require('./../services/auth_service');

const create = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const params = req.params;

  //console.log('========================');
  //for (let asd in req){
    //console.log(asd, ' -> ', req[asd]);   
  //}
  //console.log('========================');
  console.log('params', params)
  console.log('req.body', req.body)

  if (!params.username) return errorResp(res, 'Must provide a username');
  if (!params.password) return errorResp(res, 'Must provide a password');

  let err, obj;

  [err, obj] = await to(authService.createUser(params));
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
    token:obj.getJWT(),
    user: obj.toWeb()
  });
};
module.exports.login = login;
