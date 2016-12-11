/**
 * Created by Jbt on 12/8/2016.
 */
function getLoggedUser() {
    return axios.get('/loggedUser');
}

function getAllTweetsService() {
    return axios.get('http://localhost:2020/tweets');
}

function findUserByTweetsService(tweet) {
    return  axios.get('http://localhost:2020/users/' + tweet.user);
}

function putTweetsService(text, id) {
    return  axios.put('/tweets', {text: tweetText.get(0).value, user: myUserId})
}

function logOutService() {
    return axios.post('/logOut');
}