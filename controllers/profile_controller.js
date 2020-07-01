const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

let Votelists = require("../models/votelist");
let Post = require("../models/vote_element");
let Profile = require("../models/profile");
let Account = require("../models/account");
let Subreddit = require("../models/votelist");
const {
    vote
} = require("./vote_element_controller");

exports.votelists = function (req, res) {
    let posts = undefined;
    let subreddit = undefined;
    let votelists = undefined;
    let created = undefined;

    let sort = undefined;

    switch (req.query.sort) {
        case "top":
            sort = {
                votes: -1
            }
            break;
        case "new":
            sort = {
                time: -1
            }
            break;
        case "old":
            sort = {
                time: 1
            }
            break;
        default:
            sort = {
                votes: -1
            }
    }

    Profile.find({
        username: req.params.user
    }, function (err, result) {
        if (err) throw err;

    })
    Account.find({
        username: req.params.user
    }, function (err, result) {
        if (err) throw err;

        if (result.length) {
            var d = new Date(result[0]['created'])
            created = d.toLocaleDateString().replace(/\//g, '-')
        } else {
            res.render("./error")
        }
    }).then(function () {
        Profile.find({
            username: req.params.user
        }, function (err, result) {
            if (err) throw err;

        }).then(function () {
            Subreddit.find({
                    username: req.params.user
                })
                .sort(sort).exec(function (err, result) {
                    if (err) throw err;

                    if (result.length) {
                        votelists = result
                    }
                    console.log(`[Profile] fetching posts from ${req.params.user} ${result.length} !`)
                    res.render("./profile/profile_votelists", {
                        profile_user: req.params.user,
                        posts: votelists,

                        isAuth: req.isAuthenticated()
                    })
                })
        })
    })
}
exports.posts = function (req, res) {
    let posts = undefined;
    let created = undefined;

    let sort = undefined;

    switch (req.query.sort) {
        case "top":
            sort = {
                votes: -1
            }
            break;
        case "new":
            sort = {
                time: -1
            }
            break;
        case "old":
            sort = {
                time: 1
            }
            break;
        default:
            sort = {
                votes: -1
            }
    }

    Profile.find({
        username: req.params.user
    }, function (err, result) {
        if (err) throw err;

    })

    Account.find({
        username: req.params.user
    }, function (err, result) {
        if (err) throw err;

        if (result.length) {
            var d = new Date(result[0]['created'])
            created = d.toLocaleDateString().replace(/\//g, '-')
        } else {
            res.render("./error")
        }
    }).then(function () {
        Profile.find({
            username: req.params.user
        }, function (err, result) {
            if (err) throw err;


        }).then(function () {
            Post.find({
                    username: req.params.user
                })
                .sort(sort).exec(function (err, result) {
                    if (err) throw err;

                    if (result.length) {
                        posts = result
                    }
                    console.log(`[Profile] fetching posts from ${req.params.user} !`)
                    res.render("./profile/profile_vote_elements", {
                        profile_user: req.params.user,
                        posts: posts,
                        created: created,
                        isAuth: req.isAuthenticated()
                    })
                })
        })
    })
}



exports.saved_posts = function (req, res) {
    let created = undefined

    let sort = undefined;

    switch (req.query.sort) {
        case "top":
            sort = {
                votes: -1
            }
            break;
        case "new":
            sort = {
                time: -1
            }
            break;
        case "old":
            sort = {
                time: 1
            }
            break;
        default:
            sort = {
                votes: -1
            }
    }

    Profile.find({
        username: req.params.user
    }, function (err, result) {
        if (err) throw err;

    })

    Account.find({
        username: req.params.user
    }).exec().then((result) => {
        created = new Date(result[0]['created']).toLocaleDateString().replace(/\//g, '-')

        return Profile.find({
            username: req.params.user
        })
    }).then((result) => {
        console.log(result)
        return Post.find({
            _id: {
                $in: result[0].saved_posts
            }
        }).sort(sort)
    }).then((result) => {
        res.render("./profile/profile_saved_vote_elements", {
            profile_user: req.params.user,
            posts: result,
            created: created,
            isAuth: req.isAuthenticated()
        })
    }).catch((err) => {
        console.log(err)
    })
}

