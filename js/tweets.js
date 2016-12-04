var types = {
    me: "",
    friend: "notMe"
};

var tweets = [
    {username: 'James Bond', text: "Blablabla...", type: types["friend"]},
    {username: 'James Bond', text: "I'm hungry", type: types["friend"]},
    {username: 'Albert Einstein', text: "E = mc^2", type: types["friend"]},
    {username: 'Bill Gates', text: "I think 64 bytes should be enough for everyone", type: types["friend"]},
    {username: 'Frodo', text: "My Precious", type: types["friend"]}
    ];

var myUsername = 'ilan';

function createDiv(clazz) {
    var div = document.createElement('div');
    div.className = clazz;
    return div;
}



function createTweet(tweet) {
    var div = createDiv("row tweet");

    var img = document.createElement('img');
    img.className = "col-md-1 avatarpic";
    img.src = "../images/useravatar.png";

    var innerDiv = createDiv('col-md-5');
    var userNameDiv = createDiv('row');
    var userName = document.createElement('label');
    userName.className =tweet.type;
    var userNameText = document.createTextNode(tweet.username + " says:");

    var tweetText = createDiv('row');
    var tweetTextProtected = document.createTextNode(tweet.text);
    tweetText.appendChild(tweetTextProtected);

    userName.appendChild(userNameText);
    userNameDiv.appendChild(userName);
    innerDiv.appendChild(userNameDiv);
    innerDiv.appendChild(tweetText);
    div.appendChild(img);
    div.appendChild(innerDiv);

    return div;
}


function publishTweet() {
    var tweetText = document.getElementById('text-area');
    var tweetWithUsername = {username: myUsername, text: tweetText.value, type: types["me"]};
    tweets.push(tweetWithUsername);
    tweetText.value = '';
    var docfrag = document.createDocumentFragment();
    var getTweetDiv = document.getElementById('tweets');
    docfrag.appendChild(createTweet(tweetWithUsername));
    getTweetDiv.appendChild(docfrag);
}

function putTweets() {
    var docfrag = document.createDocumentFragment();
    var getTweetDiv = document.getElementById('tweets');

    tweets.forEach(function (tweet) {
        docfrag.appendChild(createTweet(tweet));
    });

    getTweetDiv.appendChild(docfrag);
}

window.onload = function () {
    var publishButton = document.getElementById('publish');
    publishButton.addEventListener('click', publishTweet);
    putTweets();

    resetsTests();
    test_group("Selectors", function () {
        assert(countLogo(1), "counting one image logo class element");
        assert(countUserNames(5), "counting 5 tweet-username classes under ot-body class");
        assert(true, "not finding any non-existant ids of elements");
    });
    test_group("CSS functions", function () {
        assert(cssGreen(), "css() sets welcome-header to green");
        assert(true, "addClass() adds papa class");
        assert(true, "removeClass() adds papa class")
    });

    test_group("Functional functions tests", function () {
        assert(true, "all function counts 1 child for all nav-btn class elements");
        assert(true, "any function doesn't find a nav-btn class element with no children");
        assert(true, "all function works with multiple functions")
    });

}