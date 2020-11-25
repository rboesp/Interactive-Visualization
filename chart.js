/*
GLOBAL VARIABLES
*/
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");

let currentYear = 1975
let ctx = document.getElementById("myChart").getContext('2d');


let options = {
    responsive: true, 
    maintainAspectRatio: false,  
    legend: {
        labels: {
            filter: function(legendItem, chartData) {
             if (legendItem.datasetIndex === 0) {
               return false;
             }
            return true;
            }
         }
     },
    scales: {
        xAxes : [{
            type: "logarithmic",
            position: 'bottom',
            gridLines: {
                display: false
            }
        }],
        yAxes : [{
            type: 'linear',
            ticks: {
                min: 5,
                max: 85,
                stepSize: 5
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
    data.forEach(element => {
        myChart.data.datasets.push( {
            label: element.name, 
            data: data,
            borderColor: 'black',           
            backgroundColor: colors[count++]
        })
    });
      myChart.update()
}

function handleServerResponse(data) {
    //this needs to be an update
    updateChart(data)
}


//put in year in call
function callServer(year) {
    console.log(year);
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
    console.log(this.value)
    callServer(this.value)
  }


/*
ENTRY POINT
*/

//build here initially
let chartData = {
    datasets: [
        {
            label: '', 
            data: [],
            borderColor: '',           
            backgroundColor: [
      
            ]
        }
    ]
}

//make the chart initially shown
let myChart = new Chart(ctx, {
    type: 'bubble',
    data: chartData,
    options: options
})


callServer(1975)
output.innerHTML = 1975