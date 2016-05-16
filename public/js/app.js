var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    $routeProvider.
    when('/', {
        templateUrl: '/public/view/default.html',
        controller: 'IndexController'
    }).
    when('/sensors', {
        templateUrl: '/public/view/sensors.html',
        controller: 'SensorsController'
    }).
    when('/sensors/:location', {
        templateUrl: '/public/view/sensor_info.html',
        controller: 'SensorInfoController'
    }).
    when('/post/:postName', {
        templateUrl: '/public/view/post.html',
        controller: 'PostController'
    }).
    when('/discord', {
        redirect: 'https://discordapp.com/invite/0Z2tzxKECEj2BHwj'
    }).
    otherwise({
        templateUrl: '/public/view/404.html'
    });
}]);

app.controller('IndexController', function($scope, $http) {

    var title = ["1-4-16", "1-1-16", "12-29-15", "12-18-15", "10-28-15", "8-13-15", "7-28-15", "7-21-15"];
    $scope.posts = [];

    for (p in title) {

        var postName = title[p];

        //use anonymous function calls to pass
        //postName to the http callback function
        $http({
            method: 'GET',
            url: '/public/posts/' + postName + '.html'
        }).then((function(postName) {
            return function(response) {
                console.log(postName);

                var html = response.data;
                var partial = {};

                partial.name = postName;
                partial.title = $(html).find('#title').html();
                partial.date = $(html).find('#date').html();
                partial.intro = $(html).find('#intro').html();

                $scope.posts.push(partial);
            }
        })(postName), function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log("Error Loading Post");
        });
    }

});

app.controller('SensorInfoController', function($scope, $route, $routeParams) {

    $scope.location = $routeParams.location;

});

app.controller('SensorsController', function($scope) {

    $scope.message = 'This is Show orders screen';

});


//handle each post page after individual posts are selected
app.controller('PostController', function($scope, $route, $routeParams) {

    $scope.post = "/public/posts/" + $routeParams.postName + ".html";

});
