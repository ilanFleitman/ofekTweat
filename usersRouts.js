/**
 * Created by Jbt on 12/8/2016.
 */
var userBL = require("./userBl");
var fs = require('fs');

function routs(app) {
    app.get('/users', function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/json'});
        res.end(JSON.stringify(userBL.getAllUsers()), 'utf-8');
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
        fs.writeFile('./public/json/users.json', JSON.stringify(userBL.addUser(users.length.toString(), req.body.username, req.body.password, users.length)));
        res.end("added user", 'utf-8');
    });

    app.post('/users/addFollowing', function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/text'});
        fs.writeFile('./public/json/users.json', JSON.stringify(userBL.addFollowing(req.body.currId, req.body.addFollowing)));
        res.end("added following", 'utf-8');
    });

    app.post('/users/deleteFollowing', function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/text'});
        fs.writeFile('./public/json/users.json', userBL.deleteFollowing(req.body.currId, req.body.deleteFollowing));
        res.end("deleted", 'utf-8');
    });

    app.get("/loggedUser", function (req, res) {
        if (req.session.user != undefined) {
            if (userBL.userById(req.session.user._id) != null) {
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
