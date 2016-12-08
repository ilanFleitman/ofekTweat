/**
 * Created by Jbt on 12/8/2016.
 */
var userBL = require("./userBl");
var dataReader = require('./dataReader');

function routs(app) {
    dataReader.users().then(function (users) {
        app.put('/logIn', function (req, res) {
            let username = req.body.username;
            let password = req.body.password;
            if (userBL.checkUserInUsers(username, password)) {
                res.writeHead(200, {'Content-Type': 'text/text'});
                req.session.user = userBL.findUserNameByUsernameAndPassword(username, password);
                res.end("log in successfully", 'utf-8');
            } else {
                res.writeHead(400, {'Content-Type': 'text/text'});
                res.end("log in faild", 'utf-8');
            }
        });
    });
    app.post("/logOut", function (req, res) {
        req.session.user = {};
        req.send("disconnected");
    });
}

module.exports = routs;