const express = require('express');
const router = express.Router();

const userController = require('./../controllers/user_controller');
const todoController = require('./../controllers/todo_controller');
const todoItemController = require('./../controllers/todo_item_controller');

const custom = require('./../middleware/custom');

const passport = require('passport');
const path = require('path');


router.post('/users', userController.create);
router.get('/users/login', userController.login);
//router.get('/users', passport.authenticate('jwt', { session: false }), userController.get);

router.post('/api/todos', passport.authenticate('jwt', {session: false}), todoController.create);
router.get('/api/todos', passport.authenticate('jwt', {session: false}), todoController.list);
router.get('/api/todos/:todoId', passport.authenticate('jwt', {session: false}), custom.todo, todoController.show);
router.patch('/api/todos/:todoId', passport.authenticate('jwt', {session: false}), custom.todo, todoController.update);
router.delete('/api/todos/:todoId', passport.authenticate('jwt', {session: false}), custom.todo, todoController.destroy);

router.post('/api/todos/:todoId/items', passport.authenticate('jwt', {session: false}), todoItemController.create);
router.patch('/api/todos/:todoId/items/:todoItemId', passport.authenticate('jwt', {session: false}), todoItemController.update);
router.delete('/api/todos/:todoId/items/:todoItemId', passport.authenticate('jwt', {session: false}), todoItemController.destroy);


module.exports = router;
