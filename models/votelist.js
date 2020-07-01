const mongoose = require('mongoose');

const votelistSchema = new mongoose.Schema({
    name: String,
    description: String,
    username: String
});

module.exports = mongoose.model('Subreddit', votelistSchema);