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