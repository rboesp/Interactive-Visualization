/*GLOBAL VARIABLES */

class Country {
    constructor(data) {
        this.name = data[0]
        this.y = parseInt(data[1]) //change here (2/2) to change x  and y axis
        this.x = parseInt(data[2])
        this.r = data[3]*5 //to make the bubbles look bigger
    }
}

//server setup

    //npm packages
    const express = require('express')
    const cors = require('cors')
    const bodyParser = require('body-parser')


    //middleware
    const app = express()
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(cors())

    //port
    const port = process.env.PORT || 3000

//


//read files setup
const fs = require("fs");
const util = require("util");
const { resolve } = require('path')
const readFileAsync = util.promisify(fs.readFile);



/*FUNCTION DEFINITIONS */

async function readData(resolve, year) {
    const data = await readFileAsync(`store/country-data-${year}.csv`, 'utf-8')
    // console.log(data);
    const splitData = data.split('\r\n').map(arr => arr.split(", "))
    // console.log(splitData);
    const parsedData = splitData.map((arr) => new Country(arr))
    // console.log(parsedData)
    resolve(parsedData)
}

const fillBubbleChartData = (years) => {
    let cty_stats = {}
    years.forEach(async year => {
        const data = await new Promise((resolve) => readData(resolve, year))
        cty_stats[year] = data
    })
    return cty_stats
}

const handleSliderChange = (req, res) => {
    const year = parseInt(req.body.year)
    console.log(year);
    if(!population_data[year]) res.json(false)
    res.json(population_data[year]) 
}

async function read(resolve, year, country) {
    // console.log(country);
    const data = await readFileAsync(`store/country-data-${year}.csv`, 'utf-8')
    const d = data.split('\r\n')
    const arr = d.filter( line => line.includes(country) )
    const splitArr = arr[0].split(', ')
    const returnData = {year: year, x: parseInt(splitArr[1]), y: parseInt(splitArr[2])}
    resolve(returnData)
}

function fillLineChartData(years, country) {
    const points = []
    years.forEach(async year => {
        const point = await new Promise((resolve) => read(resolve, year, country))
        points.push(point)
        // console.log(points);
    })
    // console.log(points);
    return points
}

/*ROUTES */
function sortByYear( a, b ) {
    if ( a.year < b.year ){
      return -1;
    }
    if ( a.year > b.year ){
      return 1;
    }
    return 0;
  }
  

app.post('/', handleSliderChange)
app.post('/line', (req, res) => {
    //here change countires to whatever comes in
    // console.log(lineData[req.body.country]);
    lineData[req.body.country].sort(sortByYear) 
    // console.log(lineData[req.body.country]);
    res.json(lineData[req.body.country])
})

/*ENTRY POINT */
const years = [1975, 1980, 1985, 1990, 1995, 2000, 2005, 2010, 2015, 2020]

const population_data = fillBubbleChartData(years)
const lineData = {}
//todo: not hard code these
let c = ['China', 'Japan', 'Nigeria', 'India', 
        'Brazil', 'Germany', 'France', 'United States', 
        'Argentina', 'Chile', 'Colombia', 'Peru', 'Norway', 
        'Sweden', 'Finland', 'Malaysia', 'Singapore', 'Indonesia']
c.forEach( co => {
    // console.log(co);
    lineData[co] = fillLineChartData(years, co)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})