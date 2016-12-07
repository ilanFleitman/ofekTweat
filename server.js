var express = require('express');
var fs = require('fs');
var app = express();
var path = require('path');
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

app.use(express.static('./public'));

app.get('/', function (req, res) {
    fs.readFile('./public/ofekTwitter/tweets.html', function (err, content) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(content, 'utf-8');
    })
});

app.get('/usersPage', function (req, res) {
    fs.readFile('./public/ofekTwitter/users.html', function (err, content) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(content, 'utf-8');
    })
});

app.get('/signUp', function (req, res) {
    fs.readFile('./public/ofekTwitter/signUp.html', function (err, content) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(content, 'utf-8');
    })
});

app.get('/signIn', function (req, res) {
    fs.readFile('./public/ofekTwitter/signIn.html', function (err, content) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(content, 'utf-8');
    })
});


app.get('/users', function (req, res) {
    fs.readFile('./public/json/users.json', function (err, content) {
        res.writeHead(200, {'Content-Type': 'text/json'});
        res.end(content, 'utf-8');
    })
});

app.get('/tweets', function (req, res) {
    fs.readFile('./public/json/tweets.json', function (err, content) {
        res.writeHead(200, {'Content-Type': 'text/json'});
        res.end(content, 'utf-8');
    })
});

app.get('/users/:id', function (req, res) {
    fs.readFile('./public/json/users.json', function (err, content) {
        res.writeHead(200, {'Content-Type': 'text/json'});
        let users = JSON.parse(content.toString());
        let user = getUserById(users, req.params.id)
        res.end(JSON.stringify(user), 'utf-8');
    })
});

app.get('/tweets/:id', function (req, res) {
    fs.readFile('./public/json/tweets.json', function (err, content) {
        res.writeHead(200, {'Content-Type': 'text/json'});
        let tweets = JSON.parse(content.toString());
        let userTweets = getAllUserTweets(tweets, req.params.id);
        res.end(JSON.stringify(userTweets), 'utf-8');
    })
});

app.get('/users/following/:id', function (req, res) {
    fs.readFile('./public/json/users.json', function (err, content) {
        res.writeHead(200, {'Content-Type': 'text/json'});
        let users = JSON.parse(content.toString());
        let usersFollowing = getUsersFolowingId(users, req.params.id)
        res.end(JSON.stringify(usersFollowing), 'utf-8');
    })
});

app.put('/tweets', function (req, res) {
    fs.readFile('./public/json/tweets.json', function (err, content) {
        res.writeHead(200, {'Content-Type': 'text/json'});
        let tweets = JSON.parse(content.toString());
        tweets.push({text: req.body.text, user: req.body.user});
        fs.writeFile('./public/json/tweets.json',JSON.stringify(tweets));
        res.end(JSON.stringify(tweets), 'utf-8');
    })
});

app.post('/users/addFollowing', function (req, res) {
    fs.readFile('./public/json/users.json', function (err, content) {
        res.writeHead(200, {'Content-Type': 'text/json'});
        let users = JSON.parse(content.toString());
        let currUser = getUserById(users, req.body.currId);
        currUser.following.push(req.body.addFollowing);
        fs.writeFile('./public/json/users.json',JSON.stringify(users));
        res.end(JSON.stringify(users), 'utf-8');
    })
});



app.post('/users/deleteFollowing', function (req, res) {
    fs.readFile('./public/json/users.json', function (err, content) {
        res.writeHead(200, {'Content-Type': 'text/json'});
        let users = JSON.parse(content.toString());
        let currUser = getUserById(users, req.body.currId);
        currUser.following = deleteFollowing(currUser.following, req.body.deleteFollowing);
        fs.writeFile('./public/json/users.json',JSON.stringify(users));
        res.end(JSON.stringify(users), 'utf-8');
    })
});

app.put('/users/addUser', function (req, res) {
    fs.readFile('./public/json/users.json', function (err, content) {
        res.writeHead(200, {'Content-Type': 'text/json'});
        let users = JSON.parse(content.toString());
        users.push({_id: users.length.toString(), username: req.body.username, password: req.body.password, following: [], idd: users.length})
        fs.writeFile('./public/json/users.json',JSON.stringify(users));
        res.end(JSON.stringify(users), 'utf-8');
    })
});

function deleteFollowing(following, userId) {
    for (var followingIndex = 0; followingIndex < following.length; followingIndex++) {
        if (following[followingIndex] === userId) {
            following.splice(followingIndex, 1);
            break;
        }
    }

    return following;
}

function getUserById(users, id) {
    for (let user of users) {
        if (user._id === id) {
            return user;
        }
    }
}

function getUsersFolowingId(users, id) {
    let followings = [];

    for (let user of users) {
        for (let followingUserId of user.following) {
            if (followingUserId === id) {
                followings.push(user);
                break;
            }
        }
    }

    return followings;
}

function getAllUserTweets(tweets, id) {
    let userTweets = [];

    for (let tweet of tweets) {
        if (tweet.user === id) {
            userTweets.push(tweet);
        }
    }

    return userTweets;
}

app.listen(2020);