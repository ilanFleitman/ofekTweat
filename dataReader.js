var fs = require('fs');

function readUsers() {
        return new Promise(function (resolve, reject){
            fs.readFile("./public/json/users.json", 'utf-8', function (err, res){
                if (err) reject(err);
                else resolve(JSON.parse(res));
            });
        });
}

function readTweets() {
    return new Promise(function (resolve, reject){
        fs.readFile("./public/json/tweets.json", 'utf-8', function (err, res){
            if (err) reject(err);
            else resolve(JSON.parse(res));
        });
    });
}



module.exports = {users : readUsers, tweets: readTweets};


