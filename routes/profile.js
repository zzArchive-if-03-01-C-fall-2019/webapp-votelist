const express = require("express");
const router = express.Router();

// CONTROLLERS
let profile_controller = require("../controllers/profile_controller")

// ROUTES
router.get('/:user/votelists', profile_controller.votelists);
router.get('/:user/posts', profile_controller.posts);
router.get('/:user/saved/posts', profile_controller.saved_posts);

router.get('/:user', function (req, res) {
    res.redirect(`/u/${req.params.user}/posts`);
});

router.get('/:user/saved', function (req, res) {
    res.redirect(`/u/${req.params.user}/saved/posts`);
})

router.get('/:user', function (req, res) {
    res.redirect(`/u/${req.params.user}/votelists`);
})



module.exports = router