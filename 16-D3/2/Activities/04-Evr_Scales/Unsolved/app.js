var dataArr = [10, 20, 2000];

console.log("min value", d3.min(dataArr));
console.log("mx value", d3.max(dataArr));
console.log("min and max value", d3.extent(dataArr));
console.log(`min value ${d3.min(dataArr)}`);

// var testScores = [50, 90, 95, 75, 85];
// var yScale = d3.scaleLinear()
//     .domain([0,100])
//     .range([0,1000]);

// console.log(`50 returns ${yScale(50)}`);
// console.log(`75 returns ${yScale(75)}`);
// console.log(`100 returns ${yScale(100)}`);

var svgHeight = 600;
var svgWidth = 1000;

// var testScores = [50, 90, 95, 75, 85];
// var yScale = d3.scaleLinear()
//     .domain(d3.extent(testScores))
//     .range([0, svgHeight])

// console.log(`50 returns ${yScale(50)}`);
// console.log(`75 returns ${yScale(75)}`);
// console.log(`100 returns ${yScale(100)}`);

testScores = [90, 85, 75, 90];
var students = ["Han", "Sarah", "Matt", "Ruchi"];

var xScale = d3.scaleBand()
    .domain(students)
    .range([0, svgWidth]);

console.log(`Han's x-coordinate: ${xScale("Han")}`);
console.log(`Sarah's x-coordinate: ${xScale(students[1])}`);
console.log(`Matt's x-coordinate: ${xScale("Matt")}`);
console.log(`Ruchi's x-coordinate: ${xScale(students[3])}`);
    
console.log(`Each band is ${xScale.bandwidth()} pixels wide.`);
    
var yScale = d3.scaleLinear()
    .domain([0,100])
    .range([0, svgHeight]);
console.log(`The height of Han's bar: ${yScale(testScores[0])}`);
