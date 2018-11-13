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
    colors = ["#1061B3" //dark blue , "#0000FF" darker blue "#0044FF" blue "#007BFF" blue "#00AAFF" light blue "#00FFC3" blue green "#00FF51" green "#26FF00" light green "#73FF00" green yellow "#FFFF00" // yellow "#FFD000" //yellow orange "#FF8800" //even lighter oranger, "#FF6200" lighter oranger "#FF4800" //dark orange "#FF0000" // dark red
]; //colors for heat map


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
    const monthly = data.monthlyVariance;
    monthly.forEach(function (d) {
        d.month = formatMonth(parseMonth(d.month)); //format json data into usable information
        d.year = formatYear(parseYear(d.year));
    });

    const variance = data.forEach(key => {
        console.log(data[variance]);
     });

    console.log(variance);

    x.domain(d3.extent(monthly, function (d) {
        return new Date(d.year)
    }));
    y.domain(month);

    chart.append("g")
        .attr("class", "grid")
        .attr("transform", "translate(" + margin.left + ", " + (height + margin.top) + ")")
        .call(d3.axisBottom(x)
            .tickFormat(d3.timeFormat("%Y"))
            .ticks(20))

    // add the Y gridlines
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