const TodoItem = require('../models').TodoItem;

module.exports = {

  create(req, res) {
    return TodoItem
      .create({
        content: req.body.content,
        todoId: req.params.todoId
      })
      .then(obj => res.status(201).send(obj))
      .catch(error => res.status(422).send(error))
  },

  update(req, res) {
    return TodoItem
      .find({
        where: {
          id: req.params.todoItemId,
          todoId: req.params.todoId,
        },
      })
      .then(obj => {
        if (!obj) {
          return res.status(404).send({
            message: 'TodoItem Not Found',
          });
        }

        return obj
          .update({
            content: req.body.content || obj.content,
            complete: (req.body.complete == undefined) ? obj.complete : req.body.complete,
          })
          .then(data => res.status(200).send(data))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

  destroy(req, res) {
    return TodoItem
      .find({
        where: {
          id: req.params.todoItemId,
          todoId: req.params.todoId,
        },
      })
      .then(obj => {
        if (!obj) {
          return res.status(404).send({
            message: 'TodoItem Not Found',
          });
        }

        return obj
          .destroy()
          .then(() => res.status(204).send())
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  },

};

