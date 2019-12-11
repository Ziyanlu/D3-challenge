// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3.select("body")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and to the bottom
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from hours-of-tv-watched.csv
d3.csv("hours-of-tv-watched.csv").then(function(tvData) {
  console.log(tvData);

  tvData.forEach(function(d){
    d.hours =+d.hours;
  });
// YOUR CODE HERE
// dataArray = d3.csv("hours-of-tv-watched.csv");
  // Cast the hours value to a number for each piece of tvData

  var xBandScale = d3.scaleBand()
    .domain(tvData.map(d => d.name))
    .range([0, chartWidth])
    .padding(0.1);

  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(tvData, d => d.hours)])
    .range([chartHeight, 0]);

  var bottomAxis = d3.axisBottom(xBandScale);
  var leftAxis = d3.axisLeft(yLinearScale).ticks(10);

  chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);

  chartGroup.append("g")
    .call(leftAxis);










//   var yScale = d3.scaleLinear()
//   .domain([0, d3.max(dataArray.hour)])
//   .range([chartHeight, 0]);
//   // Configure a band scale for the horizontal axis with a padding of 0.1 (10%)
// var xScale = d3.scaleBand()
//   .domain(dataArray.name)
//   .range([0, chartWidth])
//   .padding(0.05);

//   // Create a linear scale for the vertical axis.


//   // Create two new axes functions passing our scales in as arguments
// var yAxis = d3.axisLeft(yScale);
// var xAxis = d3.axisBottom(xScale);

//   // Append two SVG group elements to the chartGroup area,
//   // and create the bottom and left axes inside of them

//   // Create one SVG rectangle per piece of tvData
//   // Use the linear and band scales to position each rectangle within the chart

  chartGroup.selectAll(".bar")
    .data(tvData)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", d=> xBandScale(d.name))
    .attr("y", d=> yLinearScale(d.hours))
    .attr("width", xBandScale.bandwidth())
    .attr("height", d => chartHeight- yLinearScale(d.hours));

  }).catch(function(error) {
    console.log(error);
  });
