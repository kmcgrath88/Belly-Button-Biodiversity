// Use d3.json() to fetch data from JSON file
// Incoming data is internally referred to as incomingData
d3.json("samples.json").then((incomingData) => {
    var dropDown = d3.select('#selDataset');
    console.log(incomingData);
    incomingData.names.forEach((name) => {
        dropDown.append('option').text(name).property('value', name);
    })
});


function optionChanged(values) {
    d3.json("samples.json").then((incomingData) => {
        var sampleID = incomingData.samples
        var sampleIDFilter = sampleID.filter(value => value.id === values);
        console.log(sampleIDFilter[0]);
        console.log(sampleIDFilter[0].id.sample_values)
        var x_axis = sampleIDFilter[0];
        console.log(x_axis);
    
        // slice through (.slice) sample_values and .reverse to get top 10 for x and y axis
        // .map to iterate over object to convert ids to strings

    // Create your trace.
    var trace = [{
        x: x_axis.sample_values,
        y: x_axis.otu_ids,
        type: "bar",
        orientation: 'h',
    }]

    Plotly.newPlot("bar", trace);

    })
}




//     };

//     // Create the data array for our plot
//     var data = [trace];

//     // Define the plot layout
//     var layout = {
//       title: "The highest critically acclaimed movies.",
//       xaxis: { title: "Title" },
//       yaxis: { title: "Metascore (Critic) Rating"}
//     };

//     // Plot the chart to a div tag with id "bar-plot"
//     Plotly.newPlot("bar-plot", data, layout);
//   });