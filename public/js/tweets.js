var myUserId = '';
var myUserName = "";

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
    if (myUserName != tweet.username) {
        userName.className = "notMe";
    }

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

let findUserByTweet = function (tweet) {
    return axios.get('http://localhost:2020/users/' + tweet.user).then(function (response) {
        tweet.username = response.data.username;
    });
};


function publishTweet() {
    let tweetText = $('#text-area');
    axios.put('/tweets', {text: tweetText.get(0).value, user: myUserId}).then(function () {
        let tweetWithUsername = {text: tweetText.get(0).value, user: myUserId, username: myUserName};
        tweets.push(tweetWithUsername);
        tweetText.get(0).value = '';
        let docfrag = document.createDocumentFragment();
        let getTweetDiv = $('#tweets');
        docfrag.appendChild(createTweet(tweetWithUsername));
        getTweetDiv.appendChild(docfrag);
    });
}

function putTweets() {
    tweets.forEach(function (tweet) {
        $("#tweets").appendChild(createTweet(tweet));
    });
}

function logout() {
    axios.post('/logOut').then(function () {
        window.location.assign("/signIn");
    })
}

window.onload = function () {
    document.querySelector("#logOut").addEventListener('click', logout);
    var publishButton = $('#publish');
    publishButton.get(0).addEventListener('click', publishTweet);
    axios.get('/loggedUser').then(function (response) {
        myUserId = response.data._id;
        myUserName = response.data.username;
    }).then(function () {
        axios.get('http://localhost:2020/tweets').then(function (response) {
            tweets = response.data;
        }).then(function () {
            axios.all(tweets.map(findUserByTweet)).then(function () {
                putTweets();
                resetsTests();
                test_group("Selectors", function () {
                    assert(countLogo(1), "counting one image logo class element");
                    assert(countUserNames(59), "counting 5 tweet-username classes under ot-body class");
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
            });

        });
    }).catch(function (err) {
        window.location.assign("/signIn");
    })
};