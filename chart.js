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
    title: {
        display: true,
        text: 'CHey!'
    },  
    legend: {
        // labels: {
        //     filter: function(legendItem, chartData) {
        //      if (legendItem.datasetIndex === 0) {
        //        return false;
        //      }
        //     return true;
        //     }
        //  }
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

let countryCount = 0
let colors = ['red', 'blue', 'green', 'pink']

function updateChart(data) {
    // console.log(data[count++]);
    // console.log(myChart.data.datasets
    data.forEach(country => {
        const t = data[countryCount]
        console.log(country);
        myChart.data.datasets.push( {
            label: country.name, 
            data: [t],
            borderColor: 'white',           
            backgroundColor: colors[countryCount++]
        })
    });
      myChart.update()
}

function handleServerResponse(data) {
    //this needs to be an update
    updateChart(data)
    // callPoop(data)
}


//put in year in call
function callServer(year) {
    // console.log(year);
    $.post('http://localhost:3000', {year: year})
    .then(data => {
        // console.log(data);
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
let one = {x: 5, y: 5, z: 3}
let two = {x: 15, y: 15, z: 6}

//build here initially
let chartData = {
    datasets: [ //todo: fgiure out two datasets with two colors in legend and bubble
        // {
        //     label: "",
        //     data: [],
        //     backgroundColor: ""
        // },
        // {
        //     label: "",
        //     data:[ ],
        //     backgroundColor: ""
        // }
    ]
}

//make the chart initially shown
let myChart = new Chart(ctx, {
    type: 'bubble',
    data: chartData,
    options: options
})

function callPoop(data) {
    console.log(data);
    myChart.data.datasets[0].data.push(one)
    myChart.data.datasets[0].label = "Hello"
    myChart.data.datasets[0].backgroundColor = 'Brown'
    myChart.data.datasets[1].data.push(two)
    myChart.data.datasets[1].label = "Goodbye"
    myChart.data.datasets[1].backgroundColor = 'Red'
    myChart.update()
}


callServer(1975)
// callPoop()
output.innerHTML = 1975