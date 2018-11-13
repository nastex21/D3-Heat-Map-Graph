var url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json",
    margin = {
        top: 50,
        bottom: 60,
        left: 60,
        right: 20
    }, //margins to use for chart
    width = window.innerWidth - (window.innerWidth * .3), //get the width of the window and subtract the window width  times 30 percent so the width won't reach all the way to the end
    height = window.innerHeight - (window.innerHeight * .3), //get the height of the window minus the window height and 30%
    formatMonth = d3.timeFormat("%B"), //format month
    formatYear = d3.timeFormat('%Y'),
    parseMonth = d3.timeParse("%m"), //make into actual usuable format
    parseYear = d3.timeParse("%Y"),
    month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], //needed for start and end point for y axis domain
    colors = ["#1061B3", "#0000FF", "#0044FF", "#007BFF", "#00AAFF", "#00FFC3", "#00FF51", "#26FF00", "#73FF00", "#FFFF00", "#FFD000", "#FF8800", "#FF6200", "#FF4800", "#FF0000"], //colors for heat map
    varianceArr = [],  //store and separate variance keys and values
    itemSize = 2,
    cellSize = itemSize - 1;


//append svg to id chart
var svg = d3.select('#chart')
    .append("svg")
    .attr("height", height + margin.top + margin.bottom)
    .attr("width", width + margin.left + margin.right)
    .attr('id', "svg");

//append g to svg
var chart = svg
    .append("g")

const x = d3.scaleTime().range([0, width]); //scale for years
const y = d3.scaleBand().range([height, 0]); //scale for months

//grab json data from url
d3.json(url).then(function (data) {
    var monthly = data.monthlyVariance;
    monthly.forEach(function (d) {
        d.month = formatMonth(parseMonth(d.month)); //format json data into usable information
        d.year = formatYear(parseYear(d.year));
    });

    monthly.forEach(function(key){
        varianceArr.push(key.variance);
    })

    var colorScale = d3.scaleThreshold()
        .domain(d3.extent(varianceArr))
        .range(colors);

    x.domain(d3.extent(monthly, function (d) {
        return new Date(d.year)
    }));
    y.domain(month);

    chart.selectAll('rect')
        .data(monthly)
        .enter().append('g').append('rect')
        .attr('class', 'cell')
        .attr('width', cellSize)
        .attr('height', cellSize)
        .attr('y', function(d){return x(d.year)})
        .attr('x', function(d){return y(d.month)})
        .attr('fill', function(d){return colorScale(d.variance)})

    chart.append("g")
        .attr("class", "grid")
        .attr("transform", "translate(" + margin.left + ", " + (height + margin.top) + ")")
        .call(d3.axisBottom(x)
            .tickFormat(d3.timeFormat("%Y"))
            .ticks(width <= 600 ? 15 : 20))

    chart.append("g")
        .attr("class", "grid")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")")
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