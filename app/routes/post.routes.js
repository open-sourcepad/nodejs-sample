module.exports = (app) => {
  var controller = require('../controllers/post.controller.js');

  app.get('/posts', controller.findAll);
  app.post('/posts', controller.create);
  app.get('/posts/:postId', controller.findOne);
  app.put('/posts/:postId', controller.update);
  app.delete('/posts/:postId', controller.delete);
};
