import angular from 'angular';
import 'angular-ui-router';

angular.module('vulnerable', [])

.controller('logInController', function($http) {
    let cookie = document.cookie;
    if (cookie && cookie.substr(0, 6) == "userId") {
        let userId = cookie.substr(7);
        $http.get('./find-user').then(
            function(response) {
                if (response) {
                    window.location.href = "./posts.html";
                }
            }
        )
    }
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
                    alert("Incorrect Username or Password");
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
            }
        );
    }
})

.controller('postController', function($scope, $sce, $http) {
    $http.get("./find-user").then(
        function(response) {
            if (response.data != "") {
                $scope.user = response.data;
            } else {
                window.location.href = "./index.html"
            }
        },
        function(err) {
            throw err;
        }
    )

    $http.get('./get-posts').then(
        function(response) {
            $scope.posts = response.data.map((badPost) => {
                return {
                    "poster": badPost.poster,
                    "content": $sce.trustAsHtml(badPost.content),
                    "date": badPost.date
                };
            })
        },
        function(err) {
            throw err;
        }
    )

    $scope.writePost = function() {
        let postBody = { "content": $("textarea").val() };
        $http.post('./write-post', postBody).then(
            function(response) {
                window.location.reload();
            },
            function(err) {
                window.location.reload();
                throw err;
            }
        )
    }

    $scope.logOut = function() {
        document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        window.location.href = "index.html";
    }
});