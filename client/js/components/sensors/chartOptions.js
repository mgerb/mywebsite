export const ChartOptions = {
    responsive: true,
    scaleOverride: true,
    scaleStartValue: -10,
    scaleSteps: 11,
    scaleStepWidth: 10,
};

export let DataTemplate = {
    labels: [],
    datasets: [{
        label: "Max Temperature °F",
        fillColor: "rgba(220,220,220,0.2)",
        strokeColor: "rgba(220,220,220,1)",
        pointColor: "rgba(220,220,220,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: []
    }, {
        label: "Min Temperature °F",
        fillColor: "rgba(151,187,205,0)",
        strokeColor: "rgba(151,187,205,1)",
        pointColor: "rgba(151,187,205,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",
        data: []
    }]
};