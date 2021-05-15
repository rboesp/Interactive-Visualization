/*
CHART OPTIONS
*/
function n(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
const bubbleChartOptions = {
    onClick: clickOnBubble,
    responsive: true,
    maintainAspectRatio: false,
    title: {
        display: true,
        text: "GDP vs LIFE EXPECTACY vs POPULATION: 1975 - 2020",
    },
    legend: {
        display: true,
        position: "top",
        labels: {
            usePointStyle: true,
            fontSize: 20,
        },
    },
    tooltips: {
        callbacks: {
            label: function (tooltipItem, data) {
                const title = data.datasets[tooltipItem.datasetIndex].label
                return `${title.toUpperCase()} : Avg. age: ${tooltipItem.xLabel} yrs, GDP: ${n(tooltipItem.yLabel)} mill`
            },
        },
    },
    scales: {
        yAxes: [
            {
                type: "logarithmic",
                position: "left",
                scaleLabel: {
                    display: true,
                    labelString: "GDP (in millions)",
                },
                ticks: {
                    min: 5,
                    max: 55000,
                    callback: function (value, index, values) {
                        return Number(value.toString()) //pass tick values as a string into Number function
                    },
                },
                gridLines: {
                    display: true,
                },
                afterBuildTicks: function (chartObj) {
                    //Build ticks labelling as per your need
                    const nums = [0, 10, 100, 1000, 10000, 25000, 35000]
                    chartObj.ticks = nums
                },
            },
        ],
        xAxes: [
            {
                type: "linear",
                ticks: {
                    min: 40,
                    max: 85,
                    stepSize: 5,
                },
                scaleLabel: {
                    display: true,
                    labelString: "Lifespan (years)",
                },
                gridLines: {
                    display: false,
                },
            },
        ],
    },
}

const lineChartOptions = {
    maintainAspectRatio: false,
    title: {
        display: true,
        text: "GDP vs LIFESPAN CLOSEUP",
    },
    legend: {
        display: false,
    },
    scales: {
        yAxes: [
            {
                type: "linear",
                ticks: {
                    min: 45,
                    max: 85,
                    stepSize: 10,
                },
                scaleLabel: {
                    display: true,
                    labelString: "Lifespan",
                },
                gridLines: {
                    display: false,
                },
            },
        ],
        xAxes: [
            {
                type: "logarithmic",
                position: "bottom",
                ticks: {
                    min: 1,
                    max: 25000,
                    callback: function (value, index, values) {
                        return Number(value.toString()) //pass tick values as a string into Number function
                    },
                },
                scaleLabel: {
                    display: true,
                    labelString: "GDP (in millions)",
                },
                gridLines: {
                    display: false,
                },
                afterBuildTicks: function (chartObj) {
                    //Build ticks labelling as per your need
                    chartObj.ticks = []
                    chartObj.ticks.push(0)
                    chartObj.ticks.push(10)
                    chartObj.ticks.push(100)
                    chartObj.ticks.push(1000)
                    chartObj.ticks.push(10000)
                    chartObj.ticks.push(25000)
                },
            },
        ],
    },
}

/*MAKE THE CHARTS AND PUT ON SCREEN*/
let bubbleChart = new Chart(ctx, {
    type: "bubble",
    data: {
        //TODO:need to make the countries not hardcoded here, probably from server response
        datasets: countryDataSets,
    },
    options: bubbleChartOptions,
})

var lineChart = new Chart(ctx2, {
    type: "scatter",
    data: {
        datasets: [
            {
                data: [],
                borderColor: "#3e95cd",
                fill: false,
            },
        ],
    },
    options: lineChartOptions,
})
