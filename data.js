
class Country {
    constructor(name, gdp, avgAge, avgSize = 1) {
        this.name = "China" 
        this.x =gdp
        this.y = avgAge
        this.r = avgSize
    }
}


const _1975 = [ { name: "China", x: 200,y: 14, r: 3}, { name: "Ghana", x: 2,y: 14, r: 3}]
const _1980 = [ { name: "China", x: 500,y: 12,r: 3}, { name: "Ghana", x: 2,y: 14, r: 3}]
const _1985 = [ { name: "China", x: 130,y: 14,r: 5}, { name: "Ghana", x: 4,y: 14, r: 3}]
const _1990 = [ { name: "China", x: 260,y: 16,r: 6}, { name: "Ghana", x: 5,y: 14, r: 3}]
const _1995 = [ { name: "China", x: 505,y: 19,r: 7}, { name: "Ghana", x: 7,y: 14, r: 3}]
const _2000 = [ { name: "China", x: 1000,y: 18,r: 10}, { name: "Ghana", x: 9,y: 17, r: 5}]


var population_data = {
    1975: _1975,
    1980: _1980,
    1985: _1985,
    1990: _1990,
    2000: _2000
}


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
    



