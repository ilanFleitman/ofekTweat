/**
 * Created by Jbt on 12/8/2016.
 */
var userBL = require("./userBl");
var fs = require('fs');

function isUserOnSession(req) {
    return req.session.user != undefined;
}
function isUserExist(req) {
    return userBL.userById(req.session.user._id) != null;
}
function routs(app) {
    app.get('/users', function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/json'});
        let users = [];
        userBL.getAllUsers().then(function (response) {
            users = response;
            res.end(JSON.stringify(users), 'utf-8');
        });

    });

    app.get('/users/:id', function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/json'});
        res.end(JSON.stringify(userBL.userById(req.params.id)), 'utf-8');
    });

    app.get('/users/following/:id', function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/json'});
        res.end(JSON.stringify(userBL.usersFolowingId(req.params.id)), 'utf-8');
    });

    app.put('/users/addUser', function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/text'});
        fs.writeFile('./public/json/users.json', JSON.stringify(userBL.addUser(req.body.username, req.body.password)));
        res.end("added user", 'utf-8');
    });

    app.post('/users/addFollowing', function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/text'});
        fs.writeFile('./public/json/users.json', JSON.stringify(userBL.addFollowing(req.body.currId, req.body.addFollowing)));
        res.end("added following", 'utf-8');
    });

    app.post('/users/deleteFollowing', function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/text'});
        fs.writeFile('./public/json/users.json', JSON.stringify(userBL.deleteFollowing(req.body.currId, req.body.deleteFollowing)));
        res.end("deleted", 'utf-8');
    });

    app.get("/loggedUser", function (req, res) {
        if (isUserOnSession(req)) {
            if (isUserExist(req)) {
                res.writeHead(200, {'Content-Type': 'text/json', });
                res.end(JSON.stringify(userBL.userById(req.session.user._id)), 'utf-8');
            } else {
                res.writeHead(404, {'Content-Type': 'text/text', });
                res.end("user not found", 'utf-8');
            }
        } else {
            res.writeHead(400, {'Content-Type': 'text/json', 'Location': '/signIn'});
            res.end(JSON.stringify({_id: "", username: "", following: [], idd: -1}), 'utf-8');
        }
    });
}

module.exports = routs;
