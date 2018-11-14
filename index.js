var url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json",
    margin = {
        top: 50,
        bottom: 50,
        left: 60,
        right: 20
    }, //margins to use for chart
    width = window.innerWidth - (window.innerWidth * .3); //window.innerWidth - (window.innerWidth * .3), get the width of the window and subtract the window width  times 30 percent so the width won't reach all the way to the end
height = window.innerHeight - (window.innerHeight * .3); //window.innerHeight - (window.innerHeight * .3), get the height of the window minus the window height and 30%
formatMonth = d3.timeFormat("%B"), //format month
    formatYear = d3.timeFormat('%Y'),
    parseMonth = d3.timeParse("%m"), //make into actual usuable format
    parseYear = d3.timeParse("%Y"),
    month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], //needed for start and end point for y axis domain
    colors = ["#1061B3", "#0000FF", "#00FFC3", "#00FF51", "#26FF00", "#73FF00", "#FFFF00", "#FFD000", "#FF8800", "#FF6200", "#FF4800", "#FF0000"], //colors for heat map
    varianceArr = [], //store and separate variance keys and values
    rows = 12;
columns = (2015 - 1753) //data... years start in 1753 and end in 2015
heightCellSize = (height / rows),
    widthCellSize = (width / columns)


//append svg to id chart
var svg = d3.select('#chart')
    .append("svg")
    .attr("height", height + margin.top + margin.bottom)
    .attr("width", width + margin.left + margin.right)
    .attr('id', "svg");

//append g to svg
var chart = svg
    .append("g")
    .attr("height", height)
    .attr("width", width)

const x = d3.scaleTime().range([0, width]); //scale for years
const y = d3.scaleBand().range([height, 0]); //scale for months

//grab json data from url
d3.json(url).then(function (data) {
    var monthly = data.monthlyVariance;
    monthly.forEach(function (d) {
        d.month = formatMonth(parseMonth(d.month)); //format json data into usable information
        d.year = formatYear(parseYear(d.year));

    });

    monthly.forEach(function (key) {
        varianceArr.push(key.variance);
    })

    varianceArr.sort(function (a, b) {
        return a - b
    })

    var colorScale = d3.scaleQuantize()
        .domain([-6.976, 5.228])
        .range(colors);

    x.domain(d3.extent(monthly, function (d) {
        return new Date(d.year)
    }))
    y.domain(month);

    // Define the div for the tooltip
    var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    chart.selectAll('rect')
        .data(monthly)
        .enter().append('g').append('rect')
        .attr('class', 'cell')
        .attr('width', widthCellSize)
        .attr('height', heightCellSize)
        .attr('x', function (d) {
            return x(new Date(d.year)) + 60
        })
        .attr('y', function (d) {
            return y(d.month) + 42
        })
        .attr('fill', function (d) {
            return colorScale(d.variance)
        })
        .on("mouseover", function (d) {
                tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
                tooltip.html(d.month + " " + d.year + "<br/>" + "Variance: " + d.variance)
                    .style("left", (d3.event.pageX + 30) + "px")
                    .style("top", (d3.event.pageY) + "px");
        })
        .on("mouseout", function (d) {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });

    chart.append("g")
        .attr("class", "grid")
        .attr("transform", "translate(" + margin.left + ", " + (height + (margin.top - 8)) + ")")
        .call(d3.axisBottom(x)
            .tickFormat(d3.timeFormat("%Y"))
            .ticks(width <= 600 ? 15 : 20))

    chart.append("g")
        .attr("class", "grid")
        .attr("transform", "translate(" + margin.left + ", " + (margin.top + -8) + ")")
        .call(d3.axisLeft(y))



})