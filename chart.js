/*
GLOBAL VARIABLES
*/
var slider = document.getElementById("myRange")
var sliderYearTxt = document.getElementById("demo")

const startingYear = 1975
sliderYearTxt.innerHTML = startingYear

const startingCountry = "China"

let ctx = document.getElementById("myChart").getContext("2d")
var ctx2 = document.getElementById("myChart2")

const _URL = "https://moving-bubble-chart.herokuapp.com"

/*
FUNCTIONS
*/

const clickOnBubble = (event, item) => {
    if (!item[0]) return
    let index = item[0]["_datasetIndex"]
    let data = item[0]["_chart"].config.data.datasets[index].data[0]
    popluateLineChart(data.name)
}

const popluateLineChart = async (country) => {
    const data = await $.post(_URL + "/line/", { country: country })
    if (!data) return
    lineChart.data.datasets[0].data = data
    lineChart.update()
}

const populateBubbleChart = async (data) => {
    if (!data) return //here spinner?
    bubbleChart.data.datasets.forEach((dataSet, i) => {
        const countryStats = data[i]
        dataSet.data = [countryStats]
    })
    bubbleChart.update()
}

const stopSpinners = () => {
    $(".loading").attr("style", "display: none;")
}
const showChart = () => {
    $(".chart-container").attr("style", "display: block;")
}

/*
EVENT LISTENERS
*/
slider.oninput = async function () {
    const year = this.value
    sliderYearTxt.innerHTML = year
    const data = await $.post(_URL, { year: year })
    populateBubbleChart(data)
}

/*
ENTRY POINT
*/

//here change!!
/**
 * show spinners
 * get data
 * then stop spinners, show data
 */
const start = async () => {
    const data = await $.post(_URL, { year: startingYear })
    console.log(data)
    stopSpinners()
    showChart()
    populateBubbleChart(data)
    popluateLineChart(startingCountry)
}

start()
