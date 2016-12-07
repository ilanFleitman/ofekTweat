// var users = [
//     {id: 0, username: 'Marty McFly', follow: false},
//     {id: 1, username: 'Janis Joplin', follow: false},
//     {id: 2, username: 'Albert Einstein', follow: false},
//     {id: 3, username: 'Genghis Khan', follow: false},
//     {id: 4, username: 'Dracula', follow: false},
//     {id: 5, username: 'Forest Gump', follow: false},
//     {id: 6, username: 'Caligula', follow: false},
//     {id: 7, username: 'Winnie the Pooh', follow: false},
//     {id: 8, username: 'Obama', follow: false},
//     {id: 9, username: 'Henry the 8th', follow: false},
// ];

var users = [];

const TWO_ROW = 2;
const FULL_ROW = 12;


function createDiv(clazz) {
    var div = document.createElement('div');
    div.className = clazz;
    return div;
}

function createImg() {
    var img = document.createElement('img');
    img.className = "avatarpic";
    img.src = "../images/useravatar.png";
    return img;
}

function putUser(user) {
    $("#users input").get(user.idd).value = "unfollow";

    var followesDiv = document.getElementById('followes');



    var clonedUser =$("#users .row").get(user.idd).cloneNode(deep);
    clonedUser.idd = "";
    clonedUser.querySelector("input").addEventListener('click', function () {
        click(user);
    });

    followesDiv.appendChild(createDiv("col-md-12").appendChild(clonedUser));
}

function putFollowe(user) {
    $("#users input").get(user.idd).value = "follow";

    var followesDiv = document.getElementById('followes');

    var listOfDivs = followesDiv.querySelectorAll(".row");

    listOfDivs.forEach(function (userDiv) {
       if (userDiv.querySelectorAll("p")[1].innerHTML === user.username) {
           userDiv.remove();
       }
    });
}

function click(user) {
    user.follow = !user.follow;
    user.follow ? putUser(user) : putFollowe(user);
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
        followBtn.value = user.follow ? "unfollow" : "follow";
        followBtn.addEventListener('click',function () {
            click(user);
        } );

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

function putFollowes(textToLook, cols) {
    putUsers(users.filter(function (user) {
        return user.follow;
    }), textToLook, cols)
}

function getIdFromUsers(name) {
    return users.filter(function (user) {
        return user.username === name;
    })[0].idd;
}

function filterByName(userName) {
    var usersDiv =  $("#users .col-md-2");

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
    axios.get('http://10.103.50.193:8080/users').then(function (response) {
        users = response.data;
    }).then(function () {
        var index = 0;
        users.map(function (user) {
            user.idd = index++;
            user.follow = false;
        });
        putUsers(users, 'users', TWO_ROW);
        putFollowes('followes', FULL_ROW);
    });

    var filterText = document.getElementById('filterText');
    filterText.addEventListener('keyup', function () {
        filterByName(filterText.value);
    });
};