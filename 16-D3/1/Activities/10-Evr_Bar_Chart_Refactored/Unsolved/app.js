var booksReadThisYear = [17, 23, 20, 34];

var svgHeight = 600;
var svgWidth = 400;

var svg = d3
    .select("#svg-area")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth);

var svgGroup = svg.append("g")
    .attr("transform", "translate(50,100)");


svgGroup.selectAll("rect")
    .data(booksReadThisYear)
    .enter()
    .append("rect")
    .attr("width", 50)
    .attr("height", function(data) {
        return data * 10;
    })
    .attr("x", function(data, index) {
        return index *60;
    })
    .attr("y", function(data){
        return 600  -data * 10;
    })
    .attr("class","bar");

   