const mongoose = require('mongoose')


const votesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  vote: {
    type: Number
  }
});


const votepollSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  votes: [votesSchema]
});

module.exports = mongoose.model('Votepoll', votepollSchema)