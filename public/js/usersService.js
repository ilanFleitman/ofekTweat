/**
 * Created by Jbt on 12/8/2016.
 */
function getLoggedUser() {
    return axios.get('/loggedUser');
}

function getAllUsersService() {
    return axios.get('/users');
}

function addFollowingService(currUser, user) {
    return axios.post('/users/addFollowing', {currId: currUser._id, addFollowing: user._id});
}

function deleteFollowingService(currUser, user) {
    return  axios.post('/users/deleteFollowing', {currId: currUser._id, deleteFollowing: user._id});
}

function logOutService() {
    return axios.post('/logOut');
}