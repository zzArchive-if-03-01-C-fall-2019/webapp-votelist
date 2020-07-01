const mongoose = require('mongoose');

const subredditSchema = new mongoose.Schema({
    name: String,
    description: String,
    username: String
});

module.exports = mongoose.model('Subreddit', subredditSchema);