var url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json",
    margin = {
        top: 50,
        bottom: 60,
        left: 60,
        right: 20
    },
    w = window.innerWidth,
    h = window.innerHeight,
    width = w,
    height = h,
    formatMonth = d3.timeFormat("%B"),
    formatYear = d3.timeFormat('%Y'),
    parseMonth = d3.timeParse("%m"),
    parseYear = d3.timeParse("%Y"),
    month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


var svg = d3.select('#chart')
    .append("svg")
    .attr("height", height - (height / 2) + margin.top + margin.bottom)
    .attr("width", width - (width / 2) + margin.left + margin.right)
    .attr('id', "svg");

var chart = svg
    .append("g")


d3.json(url).then(function (data) {
    console.log(data);
    const monthly = data.monthlyVariance;
    monthly.forEach(function (d) {
        d.month = formatMonth(parseMonth(d.month));
        d.year = formatYear(parseYear(d.year));
    });

    const xScale = d3.scaleTime()
        .domain([1753, 2015])
        .range([0, width]);

    const yScale = d3.scaleBand()
        .domain(month)
        .range([height, 0])

    console.log(xScale(2015))

    // gridlines in x axis function
    function make_x_gridlines() {
        return d3.axisBottom(xScale)
            .ticks(263)
            .tickFormat(d3.timeFormat("%Y"))
    }

    // gridlines in y axis function
    function make_y_gridlines() {
        return d3.axisLeft(yScale)
            .tickFormat(month)
    }

    // add the X gridlines
    chart.append("g")
        .attr("class", "grid")
        .attr("transform", "translate(0," + height + ")")
        .call(make_x_gridlines()
            .tickSize(-height, 0, 0)
            .tickFormat("")
        )

    // add the Y gridlines
    chart.append("g")
        .attr("class", "grid")
        .call(make_y_gridlines()
            .tickSize(-width, 0, 0)
            .tickFormat("")
        )

    chart.append('g')
        .attr('transform', "translate(0, " + height + ")")
        .attr("id", "x-axis")
        .call(d3.axisBottom(xScale));

    chart.append("text")
        .attr("transform",
            "translate(" + (width / 2) + " ," +
            (height + margin.top) + ")")
        .style("text-anchor", "middle")
        .text("YEAR");

})