const Todo = require('../models').Todo;

let todo = async (req, res, next) => {
  let id = req.params.todoId;
  let err, obj;

  [err, obj] = await to(Todo.getOne({ where: {id: id} }));
  if (err) return errorResp(res, 'Error finding object');
  if (!obj) return errorResp(res, 'Object not found with id: ' + id);

  // check permissions
  if (obj.userId != req.user.id) return errorResp('Forbidden action');

  req.todo = obj;
  next();
};


module.exports.todo = todo;
