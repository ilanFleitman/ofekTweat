var tweets = [
    {username: 'James Bond', text: "Blablabla..."},
    {username: 'James Bond', text: "I'm hungry"},
    {username: 'Albert Einstein', text: "E = mc^2"},
    {username: 'Bill Gates', text: "I think 64 bytes should be enough for everyone"},
    {username: 'Frodo', text: "My Precious"}
    ];

var myUsername = 'ilan';

function encodeHTML(text) {
    return text.replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

function createDiv(clazz) {
    var div = document.createElement('div');
    div.className = clazz;
    return div;
}

function eraseElements(parantDiv) {
    while (parantDiv.hasChildNodes())
        parantDiv.removeChild(parantDiv.lastChild);

}

var publishTweet = function () {
    var tweetText = document.getElementById('text-area');
    var tweetWithUsername = {username: myUsername, text: encodeHTML(tweetText.value)};
    tweets.push(tweetWithUsername);
    tweetText.value = '';
    eraseElements(document.getElementById('tweets'));
    putTweets();
}

function putTweets() {
    var docfrag = document.createDocumentFragment();
    var getTweetDiv = document.getElementById('tweets');

    tweets.forEach(function (tweet) {
        var div = createDiv("row");

        var img = document.createElement('img');
        img.className = "col-md-1 avatarpic";
        img.src = "../images/useravatar.png";

        var innerDiv = createDiv('col-md-5');
        var userNameDiv = createDiv('row');
        var userName = document.createElement('label');
        userName.className = tweet.username === myUsername ? "" : "notMe";
        userName.innerHTML = tweet.username + " says:";

        var tweetText = createDiv('row');
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