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
    if (!data || !lineChart) return
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
    console.log("fired!!")
    const year = this.value
    setSliderYear(year)
}

const event = new Event("input")

async function setSliderYear(year) {
    slider.value = year
    sliderYearTxt.innerHTML = year
    const data = await $.post(_URL, { year: year })
    populateBubbleChart(data)
}
function checkKey(e) {
    const year = parseInt(slider.value)
    if (e.keyCode == "37") {
        // left arrow -- going down
        setSliderYear(year === 1975 ? 1975 : year - 5)
    } else if (e.keyCode == "39") {
        // right arrow -- going up
        setSliderYear(year === 2020 ? 2020 : year + 5)
    }
}
document.onkeydown = checkKey

/*
ENTRY POINT
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
