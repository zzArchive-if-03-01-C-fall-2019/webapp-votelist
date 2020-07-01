let Subreddit = require("../models/votelist");
let Post = require("../models/vote_element");
let Profile = require("../models/profile");
let PostState = require("../models/vote_elementState")

exports.get_all = function (req, res) {
    let subreddits = undefined;
    let posts = undefined;
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
        username: req.session.user
    }, function (err, result) {
        if (err) throw err;

    }).then(function () {
        Subreddit.find({}, function (err, doc) {
            if (err) throw err;

            if (doc.length) {
                subreddits = doc
            }
        }).then(function () {
            PostState.find({
                username: req.session.user
            }, function (err, doc) {
                if (err) throw err;

                if (doc.length) {
                    postStates = doc
                }
            }).then(function () {
                Post.find({}).sort(sort).exec(function (err, result) {
                    if (err) throw err;
                    if (result.length) {
                        posts = result
                    }

                    console.log(`[Frontpage] fetching posts!`)
                    res.render("./index", {
                        posts: posts,
                        subreddits: subreddits,
                        isAuth: req.isAuthenticated()
                    })
                });
            });
        });
    });
}