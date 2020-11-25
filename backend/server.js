/*GLOBAL VARIABLES */
class Country {
    constructor(data) {
        this.name = data[0]
        this.x = parseInt(data[1])
        this.y = parseInt(data[2])
        this.r = parseInt(data[3])
    }
}

/*server setup*/

//npm packages
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const fs = require("fs");
const util = require("util");


//middleware
const app = express()
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors())

//port
const port = process.env.PORT || 3000

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

const fillPopulationData = (years) => {
    let obj = {}
    years.forEach(async year => {
        const data = await new Promise((resolve) => readData(resolve, year))
        obj[year] = data
    })
    return obj
}

const handleSliderChange = (req, res) => {
    const year = parseInt(req.body.year)
    if(!population_data[year]) res.json(false)
    res.json(population_data[year]) 
}

//routes
app.post('/', handleSliderChange)


/*ENTRY POINT */
const years = [1975, 1980, 1985, 1990, 1995, 2000]

const population_data = fillPopulationData(years)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})