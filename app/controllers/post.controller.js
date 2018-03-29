var Entity = require('../models/post.model');


exports.create = (req, res) => {
  if (!req.body.content) {
    return res.status(422).send({ message: 'Missing params' });
  }

  var obj = new Entity({ title: req.body.title, content: req.body.content});

  obj.save((err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Oop! something went wrong.' });
    } else {
      res.send(data);
    }
  });
};


exports.findAll = (req, res) => {
  Entity.find((err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Oop! something went wrong.' });
    } else {
      res.send(data);
    }
  });
};


exports.findOne = (req, res) => {
  Entity.findById(req.params.postId, (err, obj) => {
    if ((err && err.kind === 'ObjectId') || !obj) {
      return res.status(404).send({ message: 'Object not found.' });
    }

    if (err) {
      console.error(err);
      return res.status(500).send({ message: 'Oop! something went wrong.' });
    }

    res.send(obj);
  });
};


exports.update = (req, res) => {
  Entity.findById(req.params.postId, (err, obj) => {
    if ((err && err.kind === 'ObjectId') || !obj) {
      return res.status(404).send({ message: 'Object not found.' });
    }

    if (err) {
      console.error(err);
      return res.status(500).send({ message: 'Oop! something went wrong.' });
    }

    if (req.body.title) obj.title = req.body.title;
    if (req.body.content) obj.content = req.body.content;

    obj.save((err, data) => {
      if (err) {
        res.status(500).send({ message: 'Could not update' });
      } else {
        res.send(data);
      }
    });
  });
};


exports.delete = (req, res) => {
  Entity.findByIdAndRemove(req.params.postId, (err, data) => {
    if ((err && err.kind === 'ObjectId') || !data) {
      return res.status(404).send({ message: 'Object not found.' });
    }

    if (err) {
      console.error(err);
      return res.status(500).send({ message: 'Oop! something went wrong.' });
    }

    res.send({ message: 'Successfully deleted.' });
  });
};
