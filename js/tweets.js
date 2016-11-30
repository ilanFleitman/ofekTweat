/**
 * Created by Jbt on 11/30/2016.
 */
var tweets = [ {username: 'Bobo', text: "hello"}];


var publishTweet = function () {
    var tweetText = document.getElementById('text-area');
    var tweetWithUsername = {username: 'ilan', text: tweetText.value};
    tweets.push(tweetWithUsername);
    tweetText.value = '';
    var getTweetDiv = document.getElementById('tweets');
    while (getTweetDiv.hasChildNodes())
        getTweetDiv.removeChild(getTweetDiv.lastChild);
    putTweets();
}

function putTweets() {
    var docfrag = document.createDocumentFragment();
    var getTweetDiv = document.getElementById('tweets');

    tweets.forEach(function (tweet) {
        var div = document.createElement('div');
        div.className = "row";

        var img = document.createElement('img');
        img.className = "col-md-1 avatarpic";
        img.src = "../images/useravatar.png";

        var innerDiv = document.createElement('div');
        innerDiv.className = 'col-md-2';

        var userNameDiv = document.createElement('div');
        userNameDiv.className = 'row';

        var userName = document.createElement('b');
        userName.innerHTML = tweet.username;

        var tweetText = document.createElement('div');
        tweetText.className = 'row';
        tweetText.innerHTML = tweet.text;

        userNameDiv.appendChild(userName);
        innerDiv.appendChild(userNameDiv);
        innerDiv.appendChild(tweetText);
        div.appendChild(img);
        div.appendChild(innerDiv);
        docfrag.appendChild(div);
    })

    getTweetDiv.appendChild(docfrag);
}

window.onload = function () {
    var publishButton = document.getElementById('publish');
    publishButton.addEventListener('click', publishTweet);
    putTweets();
}