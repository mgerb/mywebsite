export const Options = {
    responsive: true,
    scaleOverride: true,
    scaleSteps: 20,
    scaleStartValue: 0,
    scaleStepWidth: 5
};

export let Data = {
    labels: [],
    datasets: [{
        label: "Max Temperature °F",
        fillColor: "rgba(255,100,100,0)",
        strokeColor: "rgba(255,100,100,1)",
        pointColor: "rgba(255,100,100,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(255,100,100,1)",
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