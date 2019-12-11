

var austinTemps = [76, 59, 59, 73, 71];
d3.selectAll("#content").selectAll(".temps")
    .data(austinTemps)
    .style("height", function(d) {
      return d + "px";
    });
