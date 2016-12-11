var users = [];

let currUser = [];

const TWO_ROW = 2;
const FULL_ROW = 12;

var following = [];

function createDiv(clazz) {
    var div = document.createElement('div');
    div.className = clazz;
    return div;
}

let findUser = function (followee) {
    return axios.get('http://localhost:2020/users/' + followee).then(function (response) {
        following.push({username: response.data.username, _id: response.data._id});
    });
};

function createImg() {
    var img = document.createElement('img');
    img.className = "avatarpic";
    img.src = "../images/useravatar.png";
    return img;
}

function putFollowe(user) {
    addFollowingService(currUser, user).then(function () {
        $("#users #" + user._id + " input").get(0).value = "unfollow";
        currUser.following.push(user._id);

        var followesDiv = document.getElementById('followes');

        var clonedUser = $("#users #" + user._id + "").get(0).cloneNode(deep);
        clonedUser.className = "col-md-12";
        clonedUser.querySelector("input").addEventListener('click', function () {
            click(user);
        });

        followesDiv.appendChild(createDiv("col-md-12").appendChild(clonedUser));
    });
}

function deleteFollowing(following, userId) {
    for (var followingIndex = 0; followingIndex < following.length; followingIndex++) {
        if (following[followingIndex] === userId) {
            following.splice(followingIndex, 1);
            break;
        }
    }

    return following;
}

function isUsernameToDelete(userDiv, user) {
    return userDiv.querySelectorAll("p")[1].innerHTML === user.username;
}

function deleteFollowe(user) {
    deleteFollowingService(currUser, user).then(function () {
        $("#users #" + user._id + " input").get(0).value = "follow";
        currUser.following = deleteFollowing(currUser.following, user._id);
        var followesDiv = document.getElementById('followes');
        var listOfDivs = followesDiv.querySelectorAll(".row");
        listOfDivs.forEach(function (userDiv) {
            if (isUsernameToDelete(userDiv, user)) {
                userDiv.remove();
            }
        });
    });
}

function click(user) {
    !currUser.following.includes(user._id) ? putFollowe(user) : deleteFollowe(user);
}

function isCurrUser(user) {
    return user._id != currUser._id;
}

function putUsers(usersOfTwitter, textToLook, cols) {
    var docfrag = document.createDocumentFragment();
    var getUsersDiv = document.getElementById(textToLook);

    usersOfTwitter.forEach(function (user) {
        addUserToFragment(user, docfrag, cols);
    });

    getUsersDiv.appendChild(docfrag);
}

function addUserToFragment(user, docfrag, cols) {
    if (isCurrUser(user)) {
        var div = createDiv("col-md-" + cols + "");
        div.id = user._id;
        var img = createImg();
        var innerRow = createDiv('row');
        var centerDiv = createDiv('text-center col-md-12');
        var thumbnail = createDiv('thumbnail');
        var caption = createDiv('caption');

        var followBtn = document.createElement('input');
        followBtn.type = "button";
        followBtn.className = 'btn btn-primary';
        followBtn.value = currUser.following.includes(user._id) ? "unfollow" : "follow";
        followBtn.addEventListener('click', function () {
            click(user);
        });

        var space = document.createElement('p');

        var userName = document.createElement('p');
        userName.innerHTML = user.username;

        caption.appendChild(followBtn);
        caption.appendChild(space);
        caption.appendChild(userName);
        thumbnail.appendChild(img);
        thumbnail.appendChild(caption);
        centerDiv.appendChild(thumbnail);
        innerRow.appendChild(centerDiv);
        div.appendChild(innerRow);
        docfrag.appendChild(div);
    }
}

function putFollowes(users, textToLook, cols) {
    putUsers(users, textToLook, cols)
}

function getIdFromUsers(name) {
    return users.filter(function (user) {
        return user.username === name;
    })[0]._id;
}

function filterByName(userName) {
    var ids = users.filter(function (user) {
        return user.username.toLocaleLowerCase().includes(userName.toLowerCase());
    }).map(function (user) {
        return user._id;
    });
    var pList = document.querySelectorAll("#users .col-md-2");
    pList.forEach(function (row) {
            if (ids.includes(row.id)) {
                $("#users #" + row.id + "").get(0).style.display = "block";
            } else {
                $("#users #" + row.id + "").get(0).style.display = "none";
            }
    })
}

function logout() {
    logOutService().then(function () {
        window.location.assign("/signIn");
    })
}

function putFolloweesOfUser() {
    axios.all(currUser.following.map(findUser)).then(function () {
        putFollowes(following, 'followes', FULL_ROW);
    });
}

function putLoggedUser(response) {
    currUser = response.data;
}

function putAllUsers(response) {
    users = response.data;
}

function getUsers() {
    getAllUsersService().then(putAllUsers).then(function () {
        putUsers(users, 'users', TWO_ROW);
        putFolloweesOfUser();
    });

    var filterText = document.getElementById('filterText');
    filterText.addEventListener('keyup', function () {
        filterByName(filterText.value);
    });
}

window.onload = function () {
    document.querySelector("#logOut").addEventListener('click', logout)
    getLoggedUser().then(putLoggedUser).then(getUsers).catch(function (err) {
        window.location.assign("/signIn");
    });


};

describe("test users page", function () {
    describe("test function isUsernameToDelete", function () {
        var userDiv;
        var user;
        beforeEach(function () {
            userDiv = document.createElement("div");
            userDiv.innerHTML = "ilan";
            user = {id: "20", username: "ilan", following: []};
        });

        it("check is queryselectoe called", function () {
            var spy = spyOn(userDiv, 'querySelectorAll').and.returnValue("ilan");
            isUsernameToDelete(userDiv, user);
            expect(spy).toHaveBeenCalled();
        });

        it("check is queryselectoe called", function () {
            spyOn(userDiv, 'querySelectorAll').and.returnValue(["", userDiv]);
            var result = isUsernameToDelete(userDiv, user);
            expect(result).toBeTruthy();
        });
    });

    describe("test check if reponse is ok", function () {
        var followingList;
        var userId;
        beforeEach(function () {
            followingList = [20, 5, 10];
            userId = 5;
        });

        it("check delete following", function () {
            var lengthList = followingList.length;
            var result = deleteFollowing(followingList, userId);
            expect(lengthList - 1).toBe(result.length);
        })
    });

    describe("test put followees can call put user", function () {
        it("can call function", function () {
            var spy = spyOn(window, "putUsers");
            putFollowes([], "hi", 12);
            expect(spy).toHaveBeenCalled();
        })
    })
});
