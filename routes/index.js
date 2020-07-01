const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

let post_controller = require('../controllers/vote_element_controller')

let subreddit_controller = require('../controllers/votelist_controller')

router.put('/edit/post/:id', post_controller.edit);
router.delete('/delete/post/:id', post_controller.delete);
router.put('/save/post/:id', post_controller.save);
router.put('/unsave/post/:id', post_controller.unsave);
router.put('/vote/post/:id', post_controller.vote);
router.get('/check/states/posts', post_controller.check);

router.get('/submit/check/:subreddit', subreddit_controller.check_subreddit);
router.put('/subscribe/:subreddit', subreddit_controller.subscribe);
router.put('/unsubscribe/:subreddit', subreddit_controller.unsubscribe);

module.exports = router;