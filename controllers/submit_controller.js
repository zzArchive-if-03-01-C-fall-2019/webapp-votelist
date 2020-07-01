let Subreddit = require("../models/votelist");
let Post = require("../models/vote_element");
let Profile = require("../models/profile");

exports.subreddit_post_view = function (req, res) {
    Profile.find({
        username: req.session.user
    }, function (err, result) {
        if (err) throw err;
    });

    Profile.find({
        username: req.session.user,
    }, function (err, doc) {
        if (err) throw err;

        if (!doc.length) {
            return;
        } else {
        }
    }).then(function () {
        Subreddit.find({
            name: req.params.subreddit
        }, function (err, doc) {
            if (err) throw err

            if (doc.length) {
                res.render('./votelist/votelist_create', {
                    info: doc[0],
                    isAuth: req.isAuthenticated(),
                })
            }
        })
    })
}
exports.subreddit_post = function (req, res) {
    Post({
        title: req.body.title,
        body: req.body.body,
        username: req.session.user,
        type: "post",
        subreddit: req.params.subreddit,
    }).save(function (err, doc) {
        if (err) throw err;

        console.log(`[${req.params.subreddit}] post submitted!`)
        res.redirect(`/v/${req.params.subreddit}`)
    })
}
exports.subreddit_link_view = function (req, res) {
    Profile.find({
        username: req.session.user
    }, function (err, result) {
        if (err) throw err;
    });


    Profile.find({
        username: req.session.user,
    }, function (err, doc) {
        if (err) throw err;

        if (!doc.length) {
            return;
        } else {
        }
    }).then(function () {
        Subreddit.find({
            name: req.params.subreddit
        }, function (err, doc) {
            if (err) throw err

            if (doc.length) {
                res.render('./subreddit/subreddit_link', {
                    info: doc[0],
                    state: subscribed,
                    isAuth: req.isAuthenticated(),
                })
            }
        })
    })
}
exports.subreddit_link = function (req, res) {
    let type = "link"

    function checkURL(url) {
        return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
    }

    if (checkURL(req.body.link)) {
        type = "img"
    }

    Post({
        title: req.body.title,
        body: req.body.body,
        username: req.session.user,
        type: type,
        link: req.body.link,
        subreddit: req.params.subreddit,
    }).save(function (err, doc) {
        if (err) throw error;

        console.log(`[${req.params.subreddit}] link submitted!`)
        res.redirect(`/v/${req.params.subreddit}`)
    })
}

exports.subreddit_search = function (req, res) {
    let subreddit = undefined
    let posts = undefined



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
            subreddit = doc[0]
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
                $and: [{
                        subreddit: req.params.subreddit
                    },
                    {
                        title: {
                            $regex: '.*' + req.body.query + '.*',
                            $options: 'i'
                        }
                    }
                ]
            }).sort({
                votes: '-1'
            }).exec(function (err, result) {
                if (err) throw err;
                if (result.length) {
                    posts = result
                }

                console.log(`[${req.params.subreddit}] searching for posts which contain '{${req.body.query}}'`)
                res.render("./votelist/votelist_search", {
                    info: subreddit,
                    posts: result,
                    query: req.body.query,
                    isAuth: req.isAuthenticated(),
                })
            })
        })
    })
}

exports.front_post = function (req, res) {
    Post({
        title: req.body.title,
        body: req.body.text,
        username: req.session.user,
        type: "post",
        subreddit: req.body.subreddit,
    }).save(function (err, doc) {
        if (err) throw err;

        console.log(`[Frontpage] post submitted to [${req.body.subreddit}]`)
        res.redirect(`/v/${req.body.subreddit}/${doc._id}/comments`);
    });
}

exports.front_link = function (req, res) {
    let type = "link"

    function checkURL(url) {
        return (url.match(/\.(jpeg|jpg|gif|png)$/) != null);
    }

    if (checkURL(req.body.link)) {
        type = "img"
    }

    Post({
        title: req.body.title,
        link: req.body.link,
        username: req.session.user,
        type: type,
        subreddit: req.body.subreddit,
    }).save(function (err, doc) {
        if (err) throw err;

        console.log(`[Frontpage] link submitted to [${req.body.subreddit}]`)
        res.redirect(`/v/${req.body.subreddit}/${doc._id}/comments`);
    });
}

exports.subreddit = function (req, res) {
    Profile.update({
            username: req.session.user
        }, {
            $push: {
                owned: req.body.subreddit
            }
        },
        function (err, doc) {
            if (err) throw err;

        }).then(function () {
        Subreddit({
            name: req.body.subreddit,
            username: req.session.user,
            description: req.body.description
        }).save(function (err, doc) {
            if (err) throw err

            console.log(`[Frontpage] ${req.body.subreddit} subreddit created`)
            res.redirect(`/v/${req.body.subreddit}`);
        });
    });
}

exports.front_search = function (req, res) {
    let subreddits = undefined;
    let posts = undefined;

    Profile.find({
            username: req.session.user
        }, function (err, result) {
            if (err) throw err;
        })
        .then(function () {
            Subreddit.find({}, function (err, doc) {
                    if (err) throw err;

                    if (doc.length) {
                        subreddits = doc
                    }
                })
                .then(function () {
                    Post.find({
                            title: {
                                $regex: '.*' + req.body.query + '.*',
                                $options: 'i'
                            }
                        })
                        .sort({
                            votes: '-1'
                        })
                        .exec(function (err, result) {
                            if (err) throw err;
                            if (result.length) {
                                posts = result
                            }

                            console.log(`[Frontpage] searching for posts which contain '{${req.body.query}}'`)
                            res.render("./front/front_search", {
                                posts: result,
                                subreddits: subreddits,
                                query: req.body.query,
                                isAuth: req.isAuthenticated()
                            })
                        });
                });
        });
}

exports.front_post_view = function (req, res) {
    Profile.find({
        username: req.session.user
    }, function (err, result) {
        if (err) throw err;

        res.render("./front/front_post", {
            isAuth: req.isAuthenticated(),
        });
    })
}

exports.front_post_view = function (req, res) {
    Profile.find({
        username: req.session.user
    }, function (err, result) {
        if (err) throw err;

        res.render("./front/front_post", {
            isAuth: req.isAuthenticated(),
        });
    })
}
exports.front_link_view = function (req, res) {
    Profile.find({
        username: req.session.user
    }, function (err, result) {
        if (err) throw err;
        res.render("./front/front_link", {
            isAuth: req.isAuthenticated(),
        });
    })
}
exports.subreddit_view = function (req, res) {
    Profile.find({
        username: req.session.user
    }, function (err, result) {
        if (err) throw err;
        res.render("./votelist/create_votelist", {
            isAuth: req.isAuthenticated(),
        });
    })
}