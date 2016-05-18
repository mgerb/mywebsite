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

app.controller('SensorsController', function($scope, $http) {

    $http({
        method: 'GET',
        url: '/api/allsensors'
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available

        $scope.information = response.data;

        for (i in $scope.information) {

            var date = new Date($scope.information[i].updated);
            var options = { month: 'numeric', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };

            $scope.information[i].date = date.toLocaleString('en-US', options);

            if ((Date.now() - date) < 120000) {
                $scope.information[i].status = "Connected";
                $scope.information[i].css = "colorGreen";
            } else {
                $scope.information[i].status = "Disconnected";
                $scope.information[i].css = "colorRed";
            }

        }

    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });

});

app.controller('SensorInfoController', function($scope, $http, $routeParams) {

    $scope.location = $routeParams.location;

    $http({
        method: 'GET',
        url: '/api/sensor/' + $scope.location
    }).then(function successCallback(response) {
        // this callback will be called asynchronously
        // when the response is available

        $scope.information = response.data;

        var list = [];

        for (i in $scope.information) {

            var exists = false,
                index = 0;

            for (j in list) {

                if ($scope.information[i].year == list[j].year) {
                    exists = true;
                    index = j;
                    break;
                }

            }

            if (exists == true) {

                if (list[index].months.indexOf($scope.information[i].month) < 0) {
                    list[index].months.push($scope.information[i].month);
                }

            } else {
                //console.log("pusing" + $scope.information[i].year);
                list.push({ year: $scope.information[i].year, months: [$scope.information[i].month] });
            }

        }

        console.log(JSON.stringify(list));

    }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
    });

});

//handle each post page after individual posts are selected
app.controller('PostController', function($scope, $route, $routeParams) {

    $scope.post = "/public/posts/" + $routeParams.postName + ".html";

});
