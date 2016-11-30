var users = [
    {username: 'Marty McFly', follow: false},
    {username: 'Janis Joplin', follow: false},
    {username: 'Albert Einstein', follow: false},
    {username: 'Genghis Khan', follow: false},
    {username: 'Dracula', follow: false},
    {username: 'Forest Gump', follow: false},
    {username: 'Caligula', follow: false},
    {username: 'Winnie the Pooh', follow: false},
    {username: 'Obama', follow: false},
    {username: 'Henry the 8th', follow: false},
];

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

function eraseElements(parantDiv) {
    while (parantDiv.hasChildNodes())
        parantDiv.removeChild(parantDiv.lastChild);

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

        var followBtn = document.createElement('button');
        followBtn.className = 'btn btn-primary';
        followBtn.innerHTML = user.follow ? "unfollow" : "follow";
        followBtn.addEventListener('click', function () {
            user.follow = !user.follow;
            eraseElements(document.getElementById('users'));
            eraseElements(document.getElementById('followes'));
            filterByName(document.getElementById('filterText').value);
            putFollowes('followes', 12);
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

function putFollowes(textToLook, cols) {
    putUsers(users.filter(function (user) {
        return user.follow;
    }), textToLook, cols)
}

function filterByName(userName) {
   eraseElements(document.getElementById('users'));
    putUsers(users.filter(function (user) {
        return user.username.toLocaleLowerCase().includes(userName.toLowerCase());
    }), 'users', 2);
}

window.onload = function () {
    var filterText = document.getElementById('filterText');
    filterText.addEventListener('keyup', function () {
        filterByName(filterText.value);
    });
    putUsers(users, 'users', 2);
    putFollowes('followes', 12);
};