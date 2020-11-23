var ctx = document.getElementById("myChart").getContext('2d');

// Define the data 
var data = pop; // Add data values to array
// End Defining data
var options = {responsive: true, // Instruct chart js to respond nicely.
    maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height 
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
var myChart = new Chart(ctx, {
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
            data: [{x: 8, y: 8, r: 3}], // Specify the data values array
            borderColor: '#800000', // Add custom color border            
            backgroundColor: '#FF6347', // Add custom color background (Points and Fill)
        }
    ]
    chart.update()
}


//entry

setTimeout(() => {
    updateConfig(myChart)
}, 1110)