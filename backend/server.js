class Country {
    constructor(data) {
        this.name = data[0]
        this.x = parseInt(data[1])
        this.y = parseInt(data[2])
        this.r = parseInt(data[3])
    }
}

const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')

const fs = require("fs");
const util = require("util");

const readFileAsync = util.promisify(fs.readFile);

const readCountryData = () => {
    return new Promise(async (res) => {
        const data = await readFileAsync('country-data.csv', 'utf-8')
        const dataArr = data.split('\r\n')
        const y = dataArr.map(arr => {
            return arr.split(", ")
        })
        console.log(y);
        const n = y.map((arr) => {
            return new Country(arr)
        })
        console.log(n)
        res(n)
    })
}


//change this so that it reads from file with years in it
//probably will be array ->implicit years by index or object -> explicit years
async function readData(resolve) {
    const data = await readFileAsync('country-data.csv', 'utf-8')
    const splitData = data.split('\r\n').map(arr => arr.split(", "))
    const parsedData = splitData.map((arr) => new Country(arr))
    console.log(parsedData)
    resolve(parsedData)
}

const startServer = async() => {
    const data = await new Promise(readData)

    const _1975 = data //change this so that all are taking from data
    const _1980 = [ { name: "China", x: 500,y: 12,r: 3}, { name: "Ghana", x: 2,y: 14, r: 3}]
    const _1985 = [ { name: "China", x: 130,y: 14,r: 5}, { name: "Ghana", x: 4,y: 14, r: 3}]
    const _1990 = [ { name: "China", x: 260,y: 16,r: 6}, { name: "Ghana", x: 5,y: 14, r: 3}]
    const _1995 = [ { name: "China", x: 505,y: 19,r: 7}, { name: "Ghana", x: 7,y: 14, r: 3}]
    const _2000 = [ { name: "China", x: 1000,y: 18,r: 10}, { name: "Ghana", x: 9,y: 17, r: 5}]


    const population_data = {
        1975: _1975,
        1980: _1980,
        1985: _1985,
        1990: _1990,
        2000: _2000
    }

    const port = process.env.PORT || 3000

    //middleware
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(cors())

    //routes
    app.post('/', (req, res) => {
        console.log(req.body)
        const year = parseInt(req.body.year)
        if(!population_data[year]) res.json(false)
        console.log(population_data[year]);
        res.json(population_data[year]) //accept body parameter and use that to get the year data
    })

    //listen
    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })
    //[{ name: "China", x: 500,y: 12,r: 3}, { name: "Ghana", x: 2,y: 14, r: 3}]
}
startServer()