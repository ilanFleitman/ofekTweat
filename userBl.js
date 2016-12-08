var dataReader = require('./dataReader');
var users = [];
dataReader.users().then(function (response) {
    users = response;
})

function getUserById(id) {
    for (let user of users) {
        if (user._id === id) {
            return user;
        }
    }
}

function getUsersFolowingId(id) {
    let followings = [];

    for (let user of users) {
        for (let followingUserId of user.following) {
            if (followingUserId === id) {
                followings.push(user);
                break;
            }
        }
    }

    return followings;
}

function findUserNameByUsernameAndPassword(username, password) {
    for (user of users) {
        if (user.username === username && user.password === password) {
            return {_id: user._id, username: user.username, following: user.following, idd: user.idd};
        }
    }
    return null;
}

function checkUserInUsers(username, password) {
    for (user of users) {
        if (user.username === username && user.password === password) {
            return true;
        }
    }
    return false;
}

function deleteFollowing(id, userId) {
    let following = getUserById(id).following;
    for (var followingIndex = 0; followingIndex < following.length; followingIndex++) {
        if (following[followingIndex] === userId) {
            following.splice(followingIndex, 1);
            break;
        }
    }

    return users;
}

function getAllUsers() {
    return users;
}

function addUser(id, username, passeword, idd) {
    users.push({_id: id, username: username, passeword: passeword, following: [], idd: idd});
    return users;
}

function addFollowing(id, followingId) {
    let currUser = getUserById(id);
    currUser.following.push(followingId);
    return users;
}

module.exports = {
    userById: getUserById,
    usersFolowingId: getUsersFolowingId,
    findUserNameByUsernameAndPassword: findUserNameByUsernameAndPassword,
    checkUserInUsers: checkUserInUsers,
    deleteFollowing: deleteFollowing,
    getAllUsers: getAllUsers,
    addUser: addUser,
    addFollowing: addFollowing
};

