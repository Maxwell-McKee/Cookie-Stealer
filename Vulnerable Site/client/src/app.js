import angular from 'angular';
import 'angular-ui-router';

angular.module('vulnerable', [])

.controller('logInController', function($http) {
    this.createNew = function() {
        console.log("creating new user");
        window.location.href = "./new-user.html";
    }
    this.login = function() {
        let username = $("#username").val();
        let password = $("#password").val();
        let loginInfo = {
            "username": username,
            "password": password
        };
        $http.post('./login', loginInfo).then(
            function(response) {
                let userId = response.data;
                if (userId) {
                    console.log(userId);
                    document.cookie = "userId=" + userId;
                    window.location.href = "./posts.html"
                } else {
                    console.log("no existing user");
                }
            }
        );
    }
})

.controller('newUserController', function($http) {
    this.createUser = function() {
        let username = $("#username").val();
        let password = $("#password").val();
        console.log($("#username").val());
        console.log($("#password").val());
        let userData = {
            "username": username,
            "password": password
        };

        $http.post('./new-user', userData).then(
            function(response) {
                console.log("got response " + response.data);
                window.location.href = "./index.html";
            },
            function(err) {
                throw err;
            });
    }
})

.controller('postController', function($scope, $http) {
    console.log("getUser");
    let cookie = document.cookie;
    if (cookie.substr(0, 6) != "userId") {
        throw "invalid cookie"
    } else {
        let _id = { _id: cookie.substr(7) };
        $http.post("./find-user", _id).then(
            function(response) {
                console.log("got response " + response.data);
                $scope.user = response.data;
            },
            function(err) {
                throw err;
            }
        )
    }
});