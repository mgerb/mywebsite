app.controller('SensorInfoController', function($scope, $http, $routeParams) {

    $scope.location = $routeParams.location;

    $http({
        method: 'GET',
        url: '/api/sensor/' + $scope.location
    }).then(function successCallback(response) {
        $scope.list = createYearObjects(response.data);

        if ($scope.list.length > 0) {
            $scope.selectedObject = $scope.list[0];
            $scope.selectedMonth = $scope.list[0].months[$scope.list[0].months.length - 1];

            $scope.loadingMonth = true;
            $scope.loadingYear = true;

            displayChart("info-chart-year", "legend-year", $scope.location, $scope.list[0].year, null, function() {
                $scope.$apply(function() {
                    $scope.loadingYear = false;
                });
            });
            displayChart("info-chart-month", "legend-month", $scope.location, $scope.list[0].year, $scope.selectedMonth, function() {
                $scope.$apply(function() {
                    $scope.loadingMonth = false;
                });
            });

        } else {
            $scope.selectedObject = {};
            $scope.selectedMonth = "";
        }


    }, function errorCallback(response) {});

    $scope.onYearChange = function() {
        resetCanvas("info-chart-year", "canvas1-id");
        resetCanvas("info-chart-month", "canvas2-id");

        $scope.loadingMonth = true;
        $scope.loadingYear = true;

        displayChart("info-chart-year", "legend-year", $scope.location, $scope.selectedObject.year, null, function() {
            $scope.$apply(function() {
                $scope.loadingYear = false;
            });
        });

        displayChart("info-chart-month", "legend-month", $scope.location, $scope.selectedObject.year, $scope.selectedObject.months[0], function() {
            $scope.$apply(function() {
                $scope.loadingMonth = false;
            });
        });
    }

    $scope.onMonthChange = function() {
        resetCanvas("info-chart-month", "canvas2-id");
        $scope.loadingMonth = true;

        displayChart("info-chart-month", "legend-month", $scope.location, $scope.selectedObject.year, $scope.selectedMonth, function() {
            $scope.$apply(function() {
                $scope.loadingMonth = false;
            });
        });
    }
});

function createYearObjects(data) {
    var list = [];

    for (i in data) {

        var exists = false,
            index = 0;

        for (j in list) {

            if (data[i].year == list[j].year) {
                exists = true;
                index = j;
                break;
            }

        }

        if (exists == true) {

            if (list[index].months.indexOf(data[i].monthname) < 0) {
                list[index].months.push(data[i].monthname);
            }

        } else {
            list.push({ year: data[i].year, months: [data[i].monthname] });
        }

    }

    return list;
}

function resetCanvas(canvas_id, container_id) {
    $("#" + canvas_id).remove(); // this is my <canvas> element
    $("#" + container_id).append('<canvas class="center" id="' + canvas_id + '" width="800" height="400"></canvas>');
}

function displayChart(chart_id, chart_legend_id, location, year, month, callback) {

    var api_url = "/api";

    if (month == null) {
        api_url += "/sensor/" + location + "/" + year;
    } else {
        api_url += "/sensor/" + location + "/" + year + "/" + month;
    }
    $.ajax({
        type: 'GET',
        url: api_url,
        data: {},
        beforeSend: function() {
        },
        success: function(response) {
            var json = response;
            var data = { labels: [], datasets: [] };

            var ctx = $('#' + chart_id);

            data.datasets.push({
                label: "Max Temperature °F",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(255,100,100,1)",
                borderColor: "rgba(255,100,100,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(255,100,100,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(255,100,100,1)",
                pointHoverBorderColor: "rgba(255,100,100,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: []
            }, {
                label: "Min Temperature °F",
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(151,187,205,1)",
                borderColor: "rgba(151,187,205,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(151,187,205,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(151,187,205,1)",
                pointHoverBorderColor: "rgba(151,187,205,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: []
            });

            for (var i in json) {

                if (month == null) {
                    data.labels.push(json[i].month + "/" + json[i].day);
                } else {
                    data.labels.push(json[i].day);
                }

                data.datasets[0].data.push(json[i].maxtemp);
                data.datasets[1].data.push(json[i].mintemp);

            }

            var myChart = new Chart(ctx, {
                type: 'line',
                data: data,
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                suggestedMax: 100,
                                suggestedMin: 0
                            }
                        }]
                    }
                }
            });

            callback();
        }
    });

}
