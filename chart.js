/*
GLOBAL VARIABLES
*/
class Country {
    constructor(name, gdp, avgAge, avgSize = 1) {
        this.name = "China" 
        this.x =gdp
        this.y = avgAge
        this.r = avgSize
    }
}

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");

let currentYear = 1975
let ctx = document.getElementById("myChart").getContext('2d');


let options = {
    responsive: true, 
    maintainAspectRatio: false,  
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
                max: 20,
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
function handleServerResponse(data) {
    //this needs to be an update
}


//put in year in call
function callServer(year) {
    console.log(year);
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
      console.log(this.value)
      callServer(this.value)
    //   myChart.data.datasets[0].data = new_data
    //   myChart.update()
  }


/*
ENTRY POINT
*/

//build here initially
{
    let chartData = {
        datasets: [
            {
                label: 'Population', // Name the series
                data: data, // Specify the data values array
                borderColor: '#ef423', // Add custom color border            
                backgroundColor: '#2196f3', // Add custom color background (Points and Fill)
            }
        ]
    }
    
    //make the chart initially shown
    let myChart = new Chart(ctx, {
        type: 'bubble',
        data: chartData,
        options: options
    })
} 

callServer(1975)