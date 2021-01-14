// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 1000;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
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
d3.csv("assets/data/data.csv").then(function(stateData) {

    // Step 1: Parse Data/Cast as numbers
    // ==============================
    stateData.forEach(function(data) {
      data.poverty = +data.poverty;
      data.income = +data.income;
    });
    //console.log(stateData);
    var xLinearScale = d3.scaleLinear()
    .domain([8, d3.max(stateData, d => d.poverty) ])
    .range([0, width]);

    
  var yLinearScale = d3.scaleLinear()
    .domain([38000, d3.max(stateData, d => d.income)])
    .range([height, 0]);
   

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

    chartGroup.append("g")
    .call(leftAxis);

    
 
    var maincirclesGroup = chartGroup.selectAll(null)
    .data(stateData)
    .enter()
    .append("g")




    maincirclesGroup.append("circle")
    .classed("stateCircle", true )
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.income))
    .attr("r", "15");
    //.text(d => d.abbr)
    //.attr("fill", "lightblue")
    //.attr("opacity", ".5");

    maincirclesGroup.append("text")
    .data(stateData)
    .classed("stateText", true) 
    .text(function(d) { return d.abbr; })
    .attr('font-size',8)//font size
    //.attr('font-size',8)//font size
    .attr("x", d => xLinearScale(d.poverty))
    .attr("y", d => yLinearScale(d.income))
    
/*  
     var circlesGroup = maincirclesGroup.selectAll("circle")
    .data(stateData)
    .enter()
    .append("circle")
    .classed("stateCircle", true )
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.income))
    .attr("r", "15");
    //.text(d => d.abbr)
    //.attr("fill", "lightblue")
    //.attr("opacity", ".5");

    var text = chartGroup.selectAll("text")
    .data(stateData)
    .enter()
    .append("text")
    .classed("stateText", true) 
    .text(function(d) { return d.abbv; })
    //.attr('font-size',8)//font size
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.income))
     */
 
});