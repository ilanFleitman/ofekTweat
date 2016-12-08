/**
 * Created by Jbt on 12/8/2016.
 */
function getLoggedUser() {
    return axios.get('/loggedUser');
}

function getAllTweetsService() {
    return axios.get('http://localhost:2020/tweets');
}