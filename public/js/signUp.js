/**
 * Created by Jbt on 12/7/2016.
 */
function load() {
    var btnSignUp = document.querySelector("#signUp");
    btnSignUp.addEventListener('click', function () {
        var userName = document.querySelector("#userName").value;
        var password = document.querySelector("#password").value;
        var ConfirmPassword = document.querySelector("#confirmPassword").value;
        axios.put('/users/addUser', {username: userName, password: password}).then(function () {
            alert("sign in successfully");
            window.location.assign("/");
        })
    })
}

load();