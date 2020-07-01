const express = require("express");
const router = express.Router();

let subreddit_controller = require("../controllers/votelist_controller")
let submit_controller = require("../controllers/submit_controller")

router.get('/:subreddit', subreddit_controller.get_all);
router.get('/:subreddit/:id/comments', subreddit_controller.get_post);
router.get('/:subreddit/submit/post', submit_controller.subreddit_post_view);
router.get('/:subreddit/submit/link', submit_controller.subreddit_link_view);

router.post('/:subreddit/submit/post', submit_controller.subreddit_post);
router.post('/:subreddit/submit/link', submit_controller.subreddit_link);
router.post('/:subreddit/search', submit_controller.subreddit_search);

router.get('/:subreddit/:id', function (req, res) {
    res.redirect(`/v/${req.params.subreddit}/${req.params.id}/comments`)
});

module.exports = router