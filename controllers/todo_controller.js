const Todo = require('../models').Todo;
const TodoItem = require('../models').TodoItem;

module.exports = {

  async create(req, res) {
    res.setHeader('Content-Type', 'application/json');

    let data = req.body;
    let err, obj;

    [err, obj] = await to(Todo.create(data));
    if (err) return errorResp(res, err, 422);

    return successResp(res, { obj: obj.toWeb() }, 201);
  },

  list(req, res) {
    return Todo
      .findAll({
        include: [{
          model: TodoItem,
          as: 'todoItems',
        }],
        order: [
          ['createdAt', 'DESC'],
          [{ model: TodoItem, as: 'todoItems' }, 'createdAt', 'ASC'],
        ],
      })
      .then((objs) => res.status(200).send(objs))
      .catch((error) => res.status(400).send(error));
  },

  show(req, res) {
    return Todo
      .findById(req.params.todoId, {
        include: [{
          model: TodoItem,
          as: 'todoItems',
        }],
      })
      .then((obj) => {
        if (!obj) {
          return res.status(404).send({
            message: 'Todo Not Found',
          });
        }
        return res.status(200).send(obj);
      })
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Todo
      .findById(req.params.todoId, {
        include: [{
          model: TodoItem,
          as: 'todoItems',
        }],
      })
      .then(obj => {
        if (!obj) {
          return res.status(404).send({
            message: 'Todo Not Found',
          });
        }
        return obj
          .update({
            title: req.body.title || obj.title,
          })
          .then(() => res.status(200).send(obj))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  destroy(req, res) {
    return Todo
      .findById(req.params.todoId)
      .then(obj => {
        if (!obj) {
          return res.status(400).send({
            message: 'Todo Not Found',
          });
        }
        return obj
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  }

};
