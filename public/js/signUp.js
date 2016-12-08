function createUser(userName, password) {
    axios.put('/users/addUser', {username: userName, password: password}).then(function () {
        alert("sign in successfully");
        window.location.assign("/");
    })
}

function logout() {
    axios.post('/logOut').then(function () {
        window.location.assign("/signIn");
    })
}

function load() {
    var btnSignUp = document.querySelector("#signUp");
    btnSignUp.addEventListener('click', function () {
        var userName = document.querySelector("#userName");
        var password = document.querySelector("#password");
        var confirmPassword = document.querySelector("#confirmPassword");
        var result = function () {
            if(userName.value != "") {
                return true;
            } else {
                userName.className = "has-error";
                return false;
            }
        }();

        var result2 = function () {
            if(password.value != "") {
                return true;
            } else {
                password.className = "has-error";
                return false;
            }
        }();

        var result3 = function () {
            if(password.value === confirmPassword.value) {
                return true;
            } else {
                confirmPassword.className = "has-error";
                return false;
            }
        }();

        if (result && result2 && result3)
            createUser(userName.value, password.value);
    })
}

load();