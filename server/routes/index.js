const todosController = require('../controllers').todos;
const todoItemsController = require('../controllers').todoItems;

module.exports = (app) => {
  app.get('/api', (req,res) => res.status(200).send({
    message: 'Welcome to Todos API!'
  }));

  app.post('/api/todos', todosController.create);
  app.get('/api/todos', todosController.list);
  app.get('/api/todos/:todoId', todosController.show);
  app.patch('/api/todos/:todoId', todosController.update);
  app.delete('/api/todos/:todoId', todosController.destroy);

  app.post('/api/todos/:todoId/items', todoItemsController.create);
  app.patch('/api/todos/:todoId/items/:todoItemId', todoItemsController.update);
  app.delete('/api/todos/:todoId/items/:todoItemId', todoItemsController.destroy);
};