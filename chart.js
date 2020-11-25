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
}


//put in year in call
function callServer(year) {
    console.log(year);
    fetch('http://localhost:3000')
    .then(res => res.json())
    .then(data => {
        handleServerResponse(data)
    })
}

/*
EVENT LISTENERS
*/
slider.oninput = function() {
    output.innerHTML = this.value;

    //   if(!population_data[parseInt(this.value)])return
    //   const new_data = population_data[parseInt(this.value)]
    //   console.log(new_data);
    //   myChart.data.datasets[0].data = new_data
    //   myChart.update()
  }


/*
ENTRY POINT
*/
callServer(1975)