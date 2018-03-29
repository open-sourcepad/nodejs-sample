var mongoose = require('mongoose');

var schema = mongoose.Schema({
  title: String,
  content: String,
},{
  timestamps: true
});

module.exports = mongoose.model('Post', schema);
