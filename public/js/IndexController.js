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
