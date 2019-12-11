
function makeResponsive() {
  // if the SVG area isn't empty when the browser loads,
  // remove it and replace it with a resized version of the chart
   var svgArea = d3.select("body").select("svg");

  // clear svg is not empty
   if (!svgArea.empty()) {
    svgArea.remove();
   }

    var svgWidth = window.innerWidth *0.6;
    var svgHeight = window.innerHeight *0.6;

    var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
    };

    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;

    // Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
    var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

    var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Import Data
    d3.csv("assets/data/data.csv").then(function(data) {

        // Step 1: Parse Data/Cast as numbers
        // ==============================
        data.forEach(function(data) {
        data.smokes = +data.smokes;
        data.age = +data.age;
        });

        // Step 2: Create scale functions
        // ==============================
        var xLinearScale = d3.scaleLinear()
        .domain([d3.min(data, d => d.age)-1,d3.max(data, d => d.age)])
        .range([0, width]);

        var yLinearScale = d3.scaleLinear()
        .domain([d3.min(data, d => d.smokes)-2, d3.max(data, d => d.smokes)])
        .range([height, 0]);

        // Step 3: Create axis functions
        // ==============================
        var bottomAxis = d3.axisBottom(xLinearScale);
        var leftAxis = d3.axisLeft(yLinearScale);

        // Step 4: Append Axes to the chart
        // ==============================
        chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

        chartGroup.append("g")
        .call(leftAxis);
        
        // Step 5: Create Circles
        // ==============================
        var circleTextGroup = chartGroup.selectAll(null)
            .data(data)
            .enter()
            .append("text")
            .attr("x", d => xLinearScale(d.age)-10)
            .attr("y", d => yLinearScale(d.smokes)+7)
            .text(function(d) {
                return (`${d.abbr}`);
            })
            .style('fill', 'black');

        var circlesGroup = chartGroup.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", d => xLinearScale(d.age))
            .attr("cy", d => yLinearScale(d.smokes))
            .attr("r", "21")
            .attr("fill", "YellowGreen")
            .attr("opacity", ".4");
            
        
        // Step 6: Initialize tool tip
        // ==============================
        var toolTip = d3
        .tip()
        .attr("class", "d3-tip")
        .offset([80, -60])
        .html(function(d) {
            return (`${d.state}<br>Ages:${d.age}<br>Smokes:${d.smokes}`);
        });

        // Step 7: Create tooltip in the chart
        // ==============================
        circlesGroup.call(toolTip);

        // Step 8: Create event listeners to display and hide the tooltip
        // ==============================
        circlesGroup.on("mouseover", function(data) {
            toolTip.show(data, this);
        })
            // onmouseout event
            .on("mouseout", function(data) {
            toolTip.hide(data);
            });

        // Create axes labels
        chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 2)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Smokers (%)");

        chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top -8})`)
        .attr("class", "axisText")
        .text("Age (median)");
    }).catch(function(error) {
        console.log(error);
    });
}
// When the browser loads, makeResponsive() is called.
makeResponsive();

// When the browser window is resized, makeResponsive() is called.
d3.select(window).on("resize", makeResponsive);
