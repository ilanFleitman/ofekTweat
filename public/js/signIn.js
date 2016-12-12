/**
 * Created by Jbt on 12/8/2016.
 */
function load() {
    var btnSignIn = document.querySelector("#signIn");

    btnSignIn.addEventListener('click', function () {
        getAllUsersService().then( function () {
                var userName = document.querySelector("#userName");
                var password = document.querySelector("#password");
                axios.put('/logIn', {username: userName.value, password: password.value}).then(function () {
                    alert("logged in successfully");
                    window.location.assign("/");
                }).catch(function (error) {
                    alert("error in log in");
                });
            }
        );
    });
}

load();