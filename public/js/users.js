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

let findUser  = function (followee) {
    return axios.get('http://localhost:2020/users/' + followee).then(function (response) {
        following.push({username: response.data.username, _id: response.data._id, idd: response.data.idd});
    });
};

function createImg() {
    var img = document.createElement('img');
    img.className = "avatarpic";
    img.src = "../images/useravatar.png";
    return img;
}

function putUser(user) {
    axios.post('/users/addFollowing', {currId: currUser._id, addFollowing: user._id}).then(function () {
        $("#users input").get(user.idd).value = "unfollow";
        currUser.following.push(user._id);

        var followesDiv = document.getElementById('followes');


        var clonedUser = $("#users .row").get(user.idd).cloneNode(deep);
        clonedUser.idd = "";
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

function putFollowe(user) {
    axios.post('/users/deleteFollowing', {currId: currUser._id, deleteFollowing: user._id}).then(function () {
        $("#users input").get(user.idd).value = "follow";
        currUser.following = deleteFollowing(currUser.following, user._id);

        var followesDiv = document.getElementById('followes');

        var listOfDivs = followesDiv.querySelectorAll(".row");

        listOfDivs.forEach(function (userDiv) {
            if (userDiv.querySelectorAll("p")[1].innerHTML === user.username) {
                userDiv.remove();
            }
        });


    });
}

function click(user) {
    !currUser.following.includes(user._id) ? putUser(user) : putFollowe(user);
}

function putUsers(usersOfTwitter, textToLook, cols) {
    var docfrag = document.createDocumentFragment();
    var getUsersDiv = document.getElementById(textToLook);

    usersOfTwitter.forEach(function (user) {
        var div = createDiv("col-md-" + cols + "");
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
    });

    getUsersDiv.appendChild(docfrag);
}

function putFollowes(users, textToLook, cols) {
    putUsers(users, textToLook, cols)
}

function getIdFromUsers(name) {
    return users.filter(function (user) {
        return user.username === name;
    })[0].idd;
}

function filterByName(userName) {
    var usersDiv = $("#users .col-md-2");

    var names = users.filter(function (user) {
        return user.username.toLocaleLowerCase().includes(userName.toLowerCase());
    }).map(function (user) {
        return user.username;
    });

    var pList = document.getElementById("users").querySelectorAll("p");

    pList.forEach(function (name) {
        if (names.includes(name.innerHTML)) {
            usersDiv.get(getIdFromUsers(name.innerHTML)).style.display = "block";
        } else {
            if (name.innerHTML != "")
                usersDiv.get(getIdFromUsers(name.innerHTML)).style.display = "none";
        }
    })
}



window.onload = function () {
    axios.get('http://localhost:2020/users').then(function (response) {
        users = response.data;
        currUser = response.data[0];
    }).then(function () {
        putUsers(users, 'users', TWO_ROW);
        axios.all(currUser.following.map(findUser)).then(function () {
            putFollowes(following, 'followes', FULL_ROW);
        });

    });

    var filterText = document.getElementById('filterText');
    filterText.addEventListener('keyup', function () {
        filterByName(filterText.value);
    });
};