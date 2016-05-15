var app = angular.module('app', ['ngRoute']);
  
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

    $routeProvider.
      when('/', {
        templateUrl: '/public/view/index.html',
        controller: 'IndexController'
      }).
      when('/sensors', {
        templateUrl: '/public/view/404.html',
        controller: 'SensorsController'
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

app.controller('IndexController', function($scope) {
     
    $scope.message = 'This is Add new order screen';
     
});
 
 
app.controller('SensorsController', function($scope) {
 
    $scope.message = 'This is Show orders screen';
 
});


//handle each post page after individual posts are selected
app.controller('PostController', function($scope, $route, $routeParams) {
    
    $scope.post = "/public/posts/" + $routeParams.postName + ".html";
 
});