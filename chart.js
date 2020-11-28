/*
GLOBAL VARIABLES
*/
var slider = document.getElementById("myRange");
var sliderOutputEl = document.getElementById("demo");

let startingYear = 1975
sliderOutputEl.innerHTML = startingYear

let ctx = document.getElementById("myChart").getContext('2d');
var ctx2 = document.getElementById('myChart2');

const _URL = 'http://localhost:3000'


/*
FUNCTIONS
*/


const clickOnBubble = (evt, item) => {
    // console.log(item[0]);
    $("#chart-2").css('display', 'block')
    if(!item[0]) return
    let index = item[0]['_datasetIndex'];
    console.log(countryDataSets[index].label);
    // const data
    let data = item[0]["_chart"].config.data.datasets[index].data[0]
    console.log(`
    NAME: ${data.name}
    GDP: ${data.x}
    LIFE EXPECTANCY:${data.y}
    LAND MASS:${data.r}
    `);
}

function updateChart(data) {
    
    bubbleChart.data.datasets.forEach((dataSet,i) => {
        const countryStats = data[i]
        dataSet.data = [countryStats]
    });
    bubbleChart.update()
}

function handleServerResponse(data) {
    //this needs to be an update
    updateChart(data)
}


//put in year in call
function getBubbleChartData(year) {
    return $.post(_URL, {year: year})
}

/*
EVENT LISTENERS
*/
slider.oninput = async function() {
    const year = this.value
    sliderOutputEl.innerHTML = year
    const data = await getBubbleChartData(year)
    if(data) updateChart(data)
}


/*
ENTRY POINT
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
        xAxes : [{
            type: 'linear',
            ticks: {
                min: 50,
                max: 100,
                stepSize: 5
            },
            gridLines: {
                display: false
            }
        }]
    }
}

//make the charts
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
          data: [
            {x:60,y:400}, 
            {x:70, y:500},
            {x:71, y:600},
            {x:72, y:700},
        ],
          borderColor: "#3e95cd",
          fill: false
        }
      ]
    },
    options: lineChartOptions
  });

//this gets the initial data for the chart
async function start(year) {
    const data = await getBubbleChartData(year)
    if(data) updateChart(data)
}

start(startingYear)