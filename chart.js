var slider = document.getElementById("myRange");
var output = document.getElementById("demo");

let currentYear = 1975
let ctx = document.getElementById("myChart").getContext('2d');
    
// Define the data to show initially
let data = population_data[currentYear] 

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

slider.oninput = function() {
    output.innerHTML = this.value;
      if(!population_data[parseInt(this.value)])return
      const new_data = population_data[parseInt(this.value)]
      console.log(new_data);
      myChart.data.datasets[0].data = new_data
      myChart.update()
  }

const start = () => {
    //entry point
    output.innerHTML = slider.value;
}

$(document).ready(() => start)