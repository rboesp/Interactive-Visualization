/*
GLOBAL VARIABLES
*/
var slider = document.getElementById("myRange");
var sliderYearTxt = document.getElementById("demo");

const startingYear = 1975
sliderYearTxt.innerHTML = startingYear

const startingCountry = 'China'

let ctx = document.getElementById("myChart").getContext('2d');
var ctx2 = document.getElementById('myChart2');

const _URL = 'https://moving-bubble-chart.herokuapp.com'

/*
FUNCTIONS
*/

const clickOnBubble = (event, item) => {
    if(!item[0]) return
    let index = item[0]['_datasetIndex'];
    let data = item[0]["_chart"].config.data.datasets[index].data[0]
    popluateLineChart(data.name)
}

const popluateLineChart = async (country) => {
    const data = await $.post(_URL +'/line/', {country: country})
    if(!data) return
    lineChart.data.datasets[0].data = data
    lineChart.update()
}

const populateBubbleChart = async (year) => {
    const data = await $.post(_URL, {year: year})
    if(!data) return
    bubbleChart.data.datasets.forEach((dataSet,i) => {
        const countryStats = data[i]
        dataSet.data = [countryStats]
    });
    bubbleChart.update()
}

/*
EVENT LISTENERS
*/
slider.oninput = async function() {
    const year = this.value
    sliderYearTxt.innerHTML = year
    populateBubbleChart(year)
}


/*
ENTRY POINT
*/
populateBubbleChart(startingYear) 
popluateLineChart(startingCountry)