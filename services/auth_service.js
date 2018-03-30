const User = require('./../models').User;
//const validator = require('validator');


// allow 2 options unique_key or username
const getUniqueKeyFromBody = (body) => {
  return body.unique_key || body.username;
};
module.exports.getUniqueKeyFromBody = getUniqueKeyFromBody;


const createUser = async (userInfo) => {
  let key = getUniqueKeyFromBody(userInfo);
  if (!key) throwError('Username must be provided');

  let authInfo = { status: 'create', method: 'username' };
  let err, user;

  [err, user] = await to(User.create(userInfo));
  if (err) errorResp('Username is already taken');

  return user
};
module.exports.createUser = createUser;


const authUser = async (userInfo) => {
  let auth_info = { status: 'login', method: 'username' };
  let key = getUniqueKeyFromBody(userInfo);
  let err, user;

  if (!key) throwError('Provide username to login');
  if (!userInfo.password) throwError('Provide password to login');

  [err, user] = await to(User.findOne({ where: {username: key} }));
  console.log(err, user, key);

  if (err) throwError(err.message);
  if(!user) throwError('Invalid credentials');

  [err, user] = await to(user.comparePassword(userInfo.password));
  if (err) throwError(err.message);

  return user;
}
module.exports.authUser = authUser;
