/*
GLOBAL VARIABLES
*/
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");

let currentYear = 1975
output.innerHTML = currentYear
let ctx = document.getElementById("myChart").getContext('2d');


let countryDataSets = [ 
    {
        label: "China",
        data: [],
        backgroundColor: "red"
    },
    {
        label: "Japan",
        data: [],
        backgroundColor: "green"
    },
    {
        label: "Nigeria",
        data:[ ],
        backgroundColor: "pink"
    },
    {
        label: "India",
        data: [],
        backgroundColor: "purple"
    },
    {
        label: "Brazil",
        data:[ ],
        backgroundColor: "turquoise"
    },
    {
        label: "Germany",
        data: [],
        backgroundColor: "darkred"
    },
    {
        label: "France",
        data:[ ],
        backgroundColor: "darkblue"
    },
    {
        label: "United States",
        data: [],
        backgroundColor: "blue"
    },
    {
        label: "Argentina",
        data: [],
        backgroundColor: "skyblue"
    }
]


let options = {
    onClick: (evt, item) => {
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
    },
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


/*
FUNCTIONS
*/

let count = 0
let colors = ['red', 'blue', 'green', 'pink']

function updateChart(data) {
    
    myChart.data.datasets.forEach((dataSet,i) => {
        const countryStats = data[i]
        dataSet.data = [countryStats]
    });
    myChart.update()
}

function handleServerResponse(data) {
    //this needs to be an update
    updateChart(data)
}


//put in year in call
function callServer(year) {
    // console.log(year);
    $.post('http://localhost:3000', {year: year})
    .then(data => {
        if(data) handleServerResponse(data)
    })
}

/*
EVENT LISTENERS
*/
slider.oninput = function() {
    output.innerHTML = this.value
    // console.log(this.value)
    callServer(this.value)
  }


/*
ENTRY POINT
*/
let one = {x: 5, y: 5, z: 3}
let two = {x: 15, y: 15, z: 6}

//build here initially
let chartData = {
    //TODO:need to make the countries not hardcoded here, probably from server response
    datasets: countryDataSets
}

//make the chart initially shown
let myChart = new Chart(ctx, {
    type: 'bubble',
    data: chartData,
    options: options
})
let canvas = document.getElementById('myChart2')

var ctx2 = document.getElementById('myChart2');
var myChart2 = new Chart(ctx2, {
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
    options: {
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
      },
    }
  });

//this gets the initial data for the chart
callServer(currentYear)