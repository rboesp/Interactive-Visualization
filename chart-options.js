/*
CHART OPTIONS
*/

const bubbleChartOptions = {
    onClick: clickOnBubble,
    responsive: true, 
    maintainAspectRatio: false,
    title: {
        display: true,
        text: 'GDP vs LAND AREA vs LIFE EXPECTACY FROM 1975 - 2000'
    },  
    scales: {
        yAxes : [{
            type: "logarithmic",
            position: 'left',
            ticks: {
                min: 1,
                max: 11000,
                callback: function (value, index, values) {
                    return Number(value.toString());//pass tick values as a string into Number function
                }
            },
            gridLines: {
                display: false
            },
            afterBuildTicks: function (chartObj) { //Build ticks labelling as per your need
                chartObj.ticks = [];
                chartObj.ticks.push(0);
                chartObj.ticks.push(10);
                chartObj.ticks.push(100);
                chartObj.ticks.push(1000);
                chartObj.ticks.push(10000);
            }
        }],
        xAxes : [{
            type: 'linear',
            ticks: {
                min: 0,
                max: 100,
                stepSize: 25
            },
            gridLines: {
                display: false
            }
        }],
    }
};

const lineChartOptions = {
    maintainAspectRatio: false,
    title: {
        display: true,
        text: 'GDP vs LIFESPAN CLOSEUP'
    },
    legend: {
        display: false
    },
    scales: {
        yAxes : [{
            type: 'linear',
            ticks: {
                min: 40,
                max: 85,
                stepSize: 5
            },
            gridLines: {
                display: false
            }
        }],
        xAxes: [{
            type: "logarithmic",
            position: 'bottom',
            ticks: {
                min: 1,
                max: 11000,
                callback: function (value, index, values) {
                    return Number(value.toString());//pass tick values as a string into Number function
                }
            },
            gridLines: {
                display: false
            },
            afterBuildTicks: function (chartObj) { //Build ticks labelling as per your need
                chartObj.ticks = [];
                chartObj.ticks.push(0);
                chartObj.ticks.push(10);
                chartObj.ticks.push(100);
                chartObj.ticks.push(1000);
                chartObj.ticks.push(10000);
            }
        }]
    }
}

/*MAKE THE CHARTS AND PUT ON SCREEN*/
let bubbleChart = new Chart(ctx, {
    type: 'bubble',
    data: {
        //TODO:need to make the countries not hardcoded here, probably from server response
        datasets: countryDataSets
    },
    options: bubbleChartOptions
})


var lineChart = new Chart(ctx2, {
    type: 'scatter',
    data: {
      datasets: [{ 
          data: [],
          borderColor: "#3e95cd",
          fill: false
        }
      ]
    },
    options: lineChartOptions
  });