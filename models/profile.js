const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    username: String,
    saved_posts: Array,
    owned: Array
});

module.exports = mongoose.model('Profile', profileSchema);