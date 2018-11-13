var url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json",
    margin = {
        top: 50,
        bottom: 60,
        left: 60,
        right: 20
    },
    width = window.innerWidth - (window.innerWidth * .3),
    height = window.innerHeight - (window.innerHeight * .3),
    formatMonth = d3.timeFormat("%B"),
    formatYear = d3.timeFormat('%Y'),
    parseMonth = d3.timeParse("%m"),
    parseYear = d3.timeParse("%Y"),
    month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


var svg = d3.select('#chart')
    .append("svg")
    .attr("height", height + margin.top + margin.bottom)
    .attr("width", width + margin.left + margin.right)
    .attr('id', "svg");

var chart = svg
    .append("g")

const x = d3.scaleTime().range([0, width]);
const y = d3.scaleBand().range([height, 0]);

d3.json(url).then(function (data) {
    console.log(data);
    const monthly = data.monthlyVariance;
    monthly.forEach(function (d) {
        d.month = formatMonth(parseMonth(d.month));
        d.year = formatYear(parseYear(d.year));
    });

x.domain(d3.extent(monthly, function(d){return new Date(d.year)}));
y.domain(month);

    chart.append("g")
        .attr("class", "grid")
        .attr("transform", "translate(" + margin.left + ", " + height  + ")")
        .call(d3.axisBottom(x)
            .tickFormat(d3.timeFormat("%Y")))

    // add the Y gridlines
    chart.append("g")
        .attr("class", "grid")
        .attr("transform", "translate(" + margin.left +  ", " + 0 + ")")
        .call(d3.axisLeft(y))

 /*    chart.append('g')
        .attr("transform", "translate(0," + (height / 2) + ")")
        .attr("id", "x-axis")
        .call(d3.axisBottom(x));

    chart.append("text")
        .attr("transform", "translate(100, 100)")
        .style("text-anchor", "middle")
        .text("YEAR"); */

})