var myUserId = '';
var myUserName = "";

function createDiv(clazz) {
    var div = document.createElement('div');
    div.className = clazz;
    return div;
}

function isNotMe(tweet) {
    return myUserName != tweet.username;
}

function createTweetInDocument(tweet) {
    var div = createDiv("row tweet");

    var img = document.createElement('img');
    img.className = "col-md-1 avatarpic";
    img.src = "../images/useravatar.png";

    var innerDiv = createDiv('col-md-5');
    var userNameDiv = createDiv('row');
    var userName = document.createElement('label');
    if (isNotMe(tweet)) {
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
    return findUserByTweetsService(tweet).then(function (response) {
        tweet.username = response.data.username;
    });
};

function publishTweet() {
    let tweetText = $('#text-area');
        putTweetsService(tweetText.get(0).value, myUserId).then(function () {
        let tweetWithUsername = {text: tweetText.get(0).value, user: myUserId, username: myUserName};
        tweets.push(tweetWithUsername);
        tweetText.get(0).value = '';
        let docfrag = document.createDocumentFragment();
        let getTweetDiv = $('#tweets');
        docfrag.appendChild(createTweetInDocument(tweetWithUsername));
        getTweetDiv.appendChild(docfrag);
    });
}

function putTweets() {
    tweets.forEach(function (tweet) {
        $("#tweets").appendChild(createTweetInDocument(tweet));
    });
}

function logout() {
    logOutService().then(function () {
        window.location.assign("/signIn");
    })
}

function testGroupOne() {
    test_group("Selectors", function () {
        assert(countLogo(1), "counting one image logo class element");
        assert(countUserNames(59), "counting 5 tweet-username classes under ot-body class");
        assert(testNonExistingId(), "not finding any non-existant ids of elements");
    });
}

function testGroupTwo() {
    test_group("CSS functions e", function () {
        assert(cssGreen(), "css() sets welcome-header to coral");
        assert(cssAddClass(), "addClass() adds ilan class");
        assert(cssRemoveClass(), "removeClass() removes ilan class")
    });
}

function testGroupThree() {
    test_group("Functional functions tests", function () {
        assert(all1(), "all function counts 1 child for all nav-btn class elements");
        assert(all2(), "any function doesn't find addChildren nav-btn class element with no children");
        assert(all3(), "all function works with multiple functions")
    });
}

function fillLoggedUser(response) {
        myUserId = response.data._id;
        myUserName = response.data.username;
}

function putTweetsInArray(response) {
    tweets = response.data;
}

window.onload = function () {
    //document.querySelector("#logOut").addEventListener('click', logout);
    //var publishButton = $('#publish');
    //publishButton.get(0).addEventListener('click', publishTweet);
    getLoggedUser().then(fillLoggedUser).then(function () {
        getAllTweetsService().then(putTweetsInArray).then(function () {
            axios.all(tweets.map(findUserByTweet)).then(function () {
                putTweets();
                resetsTests();
                testGroupOne();
                testGroupTwo();
                testGroupThree();
            });

        });
    }).catch(function () {
        window.location.assign("/signIn");
    })
};

describe("test tweets page", function () {
    var spyGet;
    var spyPut;
    var spyPost;
    beforeEach(function () {
        spyGet = spyOn(axios, 'get');
        spyPut = spyOn(axios, 'put');
        spyPost = spyOn(axios, 'post');
    });

    describe("create div function", function () {
        it("check if div created", function () {
            var clazz = "ilan";
            var div = createDiv(clazz);
            expect(div).not.toBeNull();
        })

        it("check if div created with empty class", function () {
            var clazz = "";
            var div = createDiv(clazz);
            expect(div).not.toBeNull();
        })
    });

    describe("check is my username function", function () {
        it("check if it is the correct user name", function () {
            var tweet = {username: 'ilan'};
            myUserName = 'ilan';
            var result = isNotMe(tweet);
            expect(result).toBeFalsy();
        });

        it("check if it is the correct user name", function () {
            var tweet = {username: 'ilan'};
            myUserName = '';
            var result = isNotMe(tweet);
            expect(result).toBeTruthy();
        })
    });

    describe("find user by tweet test with mock", function () {
        it("test if it is working", function () {
            spyGet.and.returnValue(new Promise(function (resolve) {
                resolve([{text: "hi", user: "112"}, {text: "hi", user: "113"}, {text: "hi", user: "114"}]);
            }));
            var tweet = {user: "112"};
            var result = findUserByTweet(tweet);

            expect(result).toBeTruthy();
        })
    });

    describe("check if tweets added", function () {
        it("add tweets to tweets", function () {
            tweets = [{text: "hi", user: "10"}];
            var div = document.createElement("div");
            var b = spyOn(window, 'createTweetInDocument').and.returnValue(div);
            putTweets();

            expect(b).toHaveBeenCalledWith(tweets[0]);
        })
    })

    describe("check load function", function () {
        it("check load", function () {
            spyGet.and.returnValue()
        })
    })
});