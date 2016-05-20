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

//handle each post page after individual posts are selected
app.controller('PostController', function($scope, $route, $routeParams) {

    $scope.post = "/public/posts/" + $routeParams.postName + ".html";

});
