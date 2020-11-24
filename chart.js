// class Country_Data_Point {
//     constructor(x, y, r) {
//         this.x = x
//         this.y = y
//         this.radius = r
//     }
// }

// class DataSet {
//     constructor(label, data, borderColor, backgroundColor) {
//         this.label = label
//         this.data = data
//         this.borderColor = borderColor
//         this.backgroundColor = backgroundColor
//     }
// }

const timeGap = 5
let currentYear = 1970

const getCurrentYear = () => {
    currentYear += timeGap
    console.log(currentYear);
    return population_data[currentYear]
}

$(document).ready(() => {
    let ctx = document.getElementById("myChart").getContext('2d');

// Define the data 
let data = getCurrentYear() 

let options = {
    responsive: true, // Instruct chart js to respond nicely.
    maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height 
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

// End Defining data
let myChart = new Chart(ctx, {
    type: 'bubble',
    data: chartData,
    options: options
});

// function addData(chart, label, data) {
//     chart.data.labels.push(label);
//     chart.data.datasets.forEach((dataset) => {
//         dataset.data.push(data);
//     });
//     chart.update();
// }

// function removeData(chart) {
//     chart.data.labels.pop();
//     chart.data.datasets.forEach((dataset) => {
//         dataset.data.pop();
//     });
//     chart.update();
// }

function updateConfig(chart) {
    chart.data.datasets = [
        {
            label: 'Population', // Name the series
            data: [{x: 8, y: 4, r: 3}], // Specify the data values array
            borderColor: '#FF0000', // Add custom color border            
            backgroundColor: '#2196f3', // Add custom color background (Points and Fill)
        },
        {
            label: 'Pollution', // Name the series
            data: [{x: 8, y: 8, r: 10}], // Specify the data values array
            borderColor: '#800000', // Add custom color border            
            backgroundColor: '#FF6347', // Add custom color background (Points and Fill)
        }
    ]
    chart.update()
}


//entry

// setTimeout(() => {
//     updateConfig(myChart)
// }, 1110)


//entry point
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
//   const arr = getCurrentYear()
const arr = population_data[2000]
console.log(arr);
  myChart.data.datasets[0].data = arr
  myChart.update()
}
})