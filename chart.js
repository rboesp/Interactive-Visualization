/*
GLOBAL VARIABLES
*/
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");

let currentYear = 1975
output.innerHTML = currentYear
let ctx = document.getElementById("myChart").getContext('2d');


let options = {
    responsive: true, 
    maintainAspectRatio: false,
    title: {
        display: true,
        text: 'GDP vs LAND AREA vs LIFE EXPECTACY FROM 1975 - 2000'
    },  
    scales: {
        xAxes : [{
            type: "logarithmic",
            position: 'bottom',
            ticks: {
                min: 1,
                max: 2000,
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
                chartObj.ticks.push(2000);
            }
        }],
        yAxes : [{
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
        console.log(data);
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
    datasets: [ //TODO:need to make the countries not hardcoded here, probably from server response
        {
            label: "China",
            data: [],
            backgroundColor: "Red"
        },
        {
            label: "Ghana",
            data:[ ],
            backgroundColor: "Blue"
        },
        {
            label: "Japan",
            data: [],
            backgroundColor: "Green"
        },
        {
            label: "Nigeria",
            data:[ ],
            backgroundColor: "Pink"
        },
        {
            label: "India",
            data: [],
            backgroundColor: "Purple"
        },
        {
            label: "Brazil",
            data:[ ],
            backgroundColor: "Brown"
        },
        {
            label: "Germany",
            data: [],
            backgroundColor: "Tomatoe"
        },
        {
            label: "France",
            data:[ ],
            backgroundColor: "Orange"
        },
        {
            label: "United States",
            data: [],
            backgroundColor: "Silver"
        },
        {
            label: "Canada",
            data:[ ],
            backgroundColor: "Gold"
        },
        {
            label: "Argentina",
            data: [],
            backgroundColor: "Yellow"
        }
    ]
}

//make the chart initially shown
let myChart = new Chart(ctx, {
    type: 'bubble',
    data: chartData,
    options: options
})

//this gets the initial data for the chart
callServer(currentYear)