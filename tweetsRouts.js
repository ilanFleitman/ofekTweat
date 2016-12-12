/**
 * Created by Jbt on 12/8/2016.
 */
var tweetsBL = require('./tweetBL');
var fs = require('fs');



function routs(app) {
        app.get('/tweets/:id', function (req, res) {
            res.writeHead(200, {'Content-Type': 'text/json'});
            res.end(JSON.stringify(tweetsBL.getAllUserTweets(req.params.id)), 'utf-8');
        });

        app.get('/tweets', function (req, res) {
            res.writeHead(200, {'Content-Type': 'text/json'});
            let tweets = [];
            tweetsBL.getAllTweets().then(function (response) {
                tweets = response;
                res.end(JSON.stringify(tweets), 'utf-8');
            })

        });

        app.put('/tweets', function (req, res) {
            res.writeHead(200, {'Content-Type': 'text/text'});
            fs.writeFile('./public/json/tweets.json', JSON.stringify(tweetsBL.addTweet(req.body.text,  req.body.user)));
            res.end("add tweet", 'utf-8');
        });
}

module.exports = routs;