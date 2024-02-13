// This function is called once the HTML page is fully loaded by the browser
document.addEventListener('DOMContentLoaded', function () {
    d3.csv('data/data.csv')
        .then(function (data) {

            
            const processedData = preprocessData(data);
            console.log(processedData)

            createLeftChart("#left-chart", processedData, "Year", "AnnualMean", "Rising Temperatures and Human Impact");

            createRightChart("#right-chart", processedData, "Year", "AnnualMean", "Natural Climate Variability");
        });

        function preprocessData(data) {
            return data
                .filter(d => +d.Year >= 1890)
                .map(d => ({
                    Year: +d.Year,
                    AnnualMean: d3.mean(Object.values(d).slice(1, 13).map(Number)),
                }));
        }


    function createLeftChart(container, data, xField, yField, title) {
        const margin = { top: 80, right: 20, bottom: 30, left: 50 };
        const width = 800 - margin.left - margin.right;
        const height = 800 - margin.top - margin.bottom;

        const svg = d3.select(container)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // X and Y scales
        const xScale = d3.scaleLinear().domain(d3.extent(data, d => +d[xField])).range([0, width]);
        const yScale = d3.scaleLinear().domain(d3.extent(data, d => +d[yField])).range([height, 0]);

        // Line function
        const line = d3.line()
            .x(d => xScale(+d[xField]))
            .y(d => yScale(+d[yField]));

        // Append the line
        svg.append("path")
            .data([data])
            .attr("class", "line")
            .attr("d", line)
            .attr("fill", "none")
            .attr('stroke', 'lightsalmon');

        // Append X and Y axes
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale));

        svg.append("g")
            .call(d3.axisLeft(yScale));

        // Title
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", 0 - (margin.top / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "18px")
            .style("text-decoration", "underline")
            .text(title);
    }


    function createRightChart(container, data, xField, yField, title) {
        const margin = { top: 80, right: 20, bottom: 30, left: 50 };
        const width = 800 - margin.left - margin.right;
        const height = 800 - margin.top - margin.bottom;

        const svg = d3.select(container)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // X and Y scales
        const xScale = d3.scaleLinear().domain(d3.extent(data, d => +d[xField])).range([0, width]);
        const yScale = d3.scaleLinear().domain([d3.min(data, d => d[yField]) - 10, d3.max(data, d => d[yField]) + 10]).range([height, 0]);

        // Line function
        const line = d3.line()
            .x(d => xScale(+d[xField]))
            .y(d => yScale(+d[yField]));

        // Append the line
        svg.append("path")
            .data([data])
            .attr("class", "line")
            .attr("d", line)
            .attr("fill", "none")
            .attr('stroke', 'steelblue');

        // Append X and Y axes
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale));

        svg.append("g")
            .call(d3.axisLeft(yScale));

        // Title
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", 0 - (margin.top / 2))
            .attr("text-anchor", "middle")
            .style("font-size", "18px")
            .style("text-decoration", "underline")
            .text(title);
    }
})
