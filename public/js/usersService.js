/**
 * Created by Jbt on 12/8/2016.
 */
function getLoggedUser() {
    return axios.get('/loggedUser');
}

function getAllUsersService() {
    return axios.get('/users');
}

function addFollowingService() {
    return axios.post('/users/addFollowing', {currId: currUser._id, addFollowing: user._id});
}