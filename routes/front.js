const express = require("express");
const router = express.Router();

let submit_controller = require("../controllers/submit_controller")
let front_controller = require("../controllers/index_controller")

router.get('/', front_controller.get_all);
router.get('/submit/post', submit_controller.front_post_view);
router.get('/submit/link', submit_controller.front_link_view);
router.get('/submit/subreddit', submit_controller.subreddit_view);
router.post('/submit/post', submit_controller.front_post);
router.post('/submit/link', submit_controller.front_link);
router.post('/submit/subreddit', submit_controller.subreddit);
router.post('/search', submit_controller.front_search);

module.exports = router;