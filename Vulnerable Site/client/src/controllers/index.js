export default function() {
    angular.module('skills', [])

    .controller('statesController', function($http) {
        $http.get('/states').then((response) => {
            this.states = response.data;
        })
    })

    .controller('daysController', function($http) {
        $http.get('/days').then((response) => {
            this.days = response.data;
        })
    })

    .controller('interfaceController', ['$state', function($state) {
        this.searchByName = function() {
            console.log("Searching by name...");
            $("#main-menu").slideUp("medium", () => {
                console.log("Hiding main menu");
                $state.go('nameSearch').then(() => {
                    $("#name-search").hide()
                        .slideDown("slow", () => {
                            console.log("Name search displayed");
                        });
                });
            })

        }

        this.searchByDetail = function() {
            console.log("Searching by detail...");
            $("#main-menu").slideUp("medium", () => {
                console.log("Hiding main menu");
                $state.go('detailSearch').then(() => {
                    $("#detail-search").hide()
                        .slideDown("slow", () => {
                            console.log("Detail search displayed");
                        });
                });
            })
        }
    }])

    .controller('detailsController', function($http) {
        this.results = [{
                name: "Max",
                major: "Computer Science",
                matchingSkills: ["MEAN stack", "C++", "Java"],
                daysAvailable: ["Tuesday", "Thursday", "Friday"]
            },
            {
                name: "Ricky",
                major: "BMIS",
                matchingSkills: ["EasyVista", "Zach"],
                daysAvailable: ["Tuesday", "Thursday", "Friday"]
            },
            {
                name: "Nicole",
                major: "Civil",
                matchingSkills: ["Complaining", "somthing else", "lets make this list long", "push some things out"],
                daysAvailable: ["Tuesday", "Thursday", "I only work two days a week"]
            }
        ];
    })

    .controller('nameController', function($http) {
        this.results = {
            name: "Max McKee",
            major: "Computer Science",
            skills: ["MEAN stack", "C++", "Java"],
            hometown: {
                state: "WA",
                city: "Woodinville"
            },
            daysAvailable: ["Tuesday", "Thursday", "Friday"]
        }
    })

    .controller('backController', ['$state', function($state) {
        this.backName = function() {
            console.log("Returning to main menu");
            $("#name-search").slideUp("medium", () => {
                console.log("Name search hidden");
                $state.go("menu").then(() => {
                    $("#main-menu").hide()
                        .slideDown("slow");
                })
            })
        }
        this.backDetail = function() {
            console.log("Returning to main menu");
            $("#detail-search").slideUp("medium", () => {
                console.log("Detail search hidden");
                $state.go("menu").then(() => {
                    $("#main-menu").hide()
                        .slideDown("slow");
                })
            })
        }
    }])
}