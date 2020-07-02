let Subreddit = require("../models/votelist");
let Post = require("../models/vote_element");
let Profile = require("../models/profile");

exports.get_all = function (req, res) {
    let subreddit = undefined;
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

    });

    Subreddit.find({
        name: req.params.subreddit
    }, function (err, doc) {
        if (err) throw err;

        if (doc.length) {
            subreddit = doc[0]
        } else {
            res.render("./error")
        }
    }).then(function () {
        Profile.find({
            username: req.session.user,
        }, function (err, doc) {
            if (err) throw err;
        }).then(function () {
            Post.find({
                subreddit: req.params.subreddit
            }).sort(sort).exec(function (err, result) {
                if (err) throw err;
                if (result.length) {
                    posts = result
                }

                console.log(`[${req.params.subreddit}] fetching posts!`)
                res.render("./votelist/votelist", {
                    info: subreddit,
                    posts: posts,
                    isAuth: req.isAuthenticated()
                })
            });
        });
    });
}

exports.get_post = function (req, res) {
    let info = undefined
    let post = undefined
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
    });

    Subreddit.find({
        name: req.params.subreddit
    }, function (err, doc) {
        if (err) throw err

        if (doc.length) {
            info = doc[0]
        }
    }).then(function () {
        Profile.find({
            username: req.session.user,
        }, function (err, doc) {
            if (err) throw err;

            if (!doc.length) {
                return;
            } else {
            }
        }).then(function () {
            Post.find({
                _id: req.params.id
            }, function (err, doc) {
                if (err) {
                    res.render('./error')
                } else {
                    if (doc.length) {
                        post = doc[0]
                    }
                }
            }).then(function () {

                Comment.find({
                    ref: req.params.id
                }).sort(sort).exec(function (err, result) {
                    if (err) throw err;
                    if (result.length) {
                        comments = result
                    }

                    res.render('./post', {
                        info: info,
                        post: post,
                        isAuth: req.isAuthenticated()
                    })
                })
            })
        })
    })
}

exports.check_subreddit = function (req, res) {
    Subreddit.find({
        name: req.params.subreddit
    }, function (err, doc) {
        if (err) throw err;

        if (!doc.length) {
            res.send(false);
            return;
        }
        console.log(`[${req.params.subreddit}] checked!`)
        res.send(true);
    });
}

exports.subscribe = function (req, res) {
    if (err) throw err;
    Profile.update({
        username: req.session.user
    }, {
        $push: {
        }
    }, function (err, doc) {
        if (err) throw err;

        console.log(`[${req.params.subreddit}] subscription added!`)
        res.send('success!')
    })
}

exports.unsubscribe = function (req, res) {
    if (err) throw err;
    Profile.update({
        username: req.session.user
    }, {
        $pull: {
        }
    }, function (err, doc) {
        if (err) throw err;

        console.log(`[${req.params.subeddit}] subscription removed!`)
        res.send('success!')
    })
}