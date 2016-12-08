var dataReader = require('./dataReader');
var tweets = [];
dataReader.tweets().then(function (response) {
    tweets = response;
});

function getAllUserTweets(id) {
    let userTweets = [];

    for (let tweet of tweets) {
        if (tweet.user === id) {
            userTweets.push(tweet);
        }
    }

    return userTweets;
}

function getAllTweets() {
    return tweets;
}

function addTweet(text, user) {
    tweets.push({text: text, user: user});
    return tweets;
}

module.exports = {
    getAllUserTweets: getAllUserTweets,
    getAllTweets: getAllTweets,
    addTweet: addTweet
};