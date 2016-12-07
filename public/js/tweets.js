
var types = {
    me: "",
    friend: "notMe"
};

// var tweets = [
//     {username: 'James Bond', text: "Blablabla...", type: types["friend"]},
//     {username: 'James Bond', text: "I'm hungry", type: types["friend"]},
//     {username: 'Albert Einstein', text: "E = mc^2", type: types["friend"]},
//     {username: 'Bill Gates', text: "I think 64 bytes should be enough for everyone", type: types["friend"]},
//     {username: 'Frodo e', text: "My Precious", type: types["friend"]}
//     ];
var tweets = [];




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
    userName.className = "";
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
    var tweetText = $('#text-area');
    var tweetWithUsername = {username: myUsername, text: tweetText.get(0).value, type: types["me"]};
    tweets.push(tweetWithUsername);
    tweetText.get(0).value = '';
    var docfrag = document.createDocumentFragment();
    var getTweetDiv =$('#tweets');
    docfrag.appendChild(createTweet(tweetWithUsername));
    getTweetDiv.appendChild(docfrag);
}

function putTweets() {
    tweets.forEach(function (tweet) {
        $("#tweets").appendChild(createTweet(tweet));
    });
}

window.onload = function () {
    var publishButton = $('#publish');
    publishButton.get(0).addEventListener('click', publishTweet);
    axios.get('http://10.103.50.193:8080/tweets').then(function (response) {
        tweets = response.data;
    }).then(function () {
        let fn = function (tweet) {
            return axios.get('http://10.103.50.193:8080/users/' + tweet.user).then(function (response) {
                tweet.username = response.data[0].username;
            });
        };

        axios.all(tweets.map(fn)).then(putTweets);;


        // tweets.forEach(function (tweet) {
        //     usernames.push(axios.get('http://10.103.50.193:8080/users/' + tweet.user).then(function (response) {
        //         tweet.username = response.data[0].username;
        //     }));
        // });
        //
        // axios.all(usernames).then(putTweets);
    });


    resetsTests();
    test_group("Selectors", function () {
        assert(countLogo(1), "counting one image logo class element");
        assert(countUserNames(5), "counting 5 tweet-username classes under ot-body class");
        assert(testNonExistingId(), "not finding any non-existant ids of elements");
    });

    test_group("CSS functions e", function () {
        assert(cssGreen(), "css() sets welcome-header to coral");
        assert(cssAddClass(), "addClass() adds ilan class");
        assert(cssRemoveClass(), "removeClass() removes ilan class")
    });

    test_group("Functional functions tests", function () {
        assert(all1(), "all function counts 1 child for all nav-btn class elements");
        assert(all2(), "any function doesn't find addChildren nav-btn class element with no children");
        assert(all3(), "all function works with multiple functions")
    });

}