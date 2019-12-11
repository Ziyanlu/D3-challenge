// Data which we will be using to build our rectangle
var booksReadThisYear = [15];

// Append the SVG wrapper to the page, set its height and width, and create a variable which references it

var table = d3.select("#svg-area");
table.attr("width", "600px").attr("height", "400px");
// Append a rectangle and set its height in relation to the booksReadThisYear value
var rectangles = svg.selectAll("rectangle");
rectangles.data(bookReadThisYear)
          .enter()
          .append("rectangle")
          .attr("width", 50)
          .attr("height", )
