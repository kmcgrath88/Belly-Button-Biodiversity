// Use d3.json() to fetch data from JSON file
// Incoming data is internally referred to as incomingData
// Appending sample IDs to dropdown
d3.json("samples.json").then((incomingData) => {
    var dropDown = d3.select('#selDataset');
    console.log(incomingData);
    incomingData.names.forEach((name) => {
        dropDown.append('option').text(name).property('value', name); 
    
    })
});


function optionChanged(values) {
    d3.json("samples.json").then((incomingData) => {
        var samples = incomingData.samples
        var sampleIDFilter = samples.filter(value => value.id == values);
        

        var subjectID = sampleIDFilter[0].id
        var result = sampleIDFilter[0];
        console.log(result);
        var otuIDs = result.otu_ids;
        console.log(otuIDs);
        var otuLabels = result.otu_labels;
        var sampleValues = result.sample_values;    
    
        var yticks = otuIDs.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

    // Create trace for bar graph.
    var barTrace = [{
        x: sampleValues.slice(0,10).reverse(),
        y: yticks,
        text: otuLabels.slice(0,10).reverse(),
        type: "bar",
        orientation: 'h',
    }];

    // Define the bar graph layout.
    var barLayout = {
      title: `Top 10 OTUs for Subject ID: ${subjectID}`,
      xaxis: { title: "Sample Values" },
      yaxis: { 
        title: "OTUs",
        showticklabels: true}
    };

    Plotly.newPlot("bar", barTrace, barLayout);

    var bubbleTrace = [{
        x: otuIDs,
        y: sampleValues,
        mode: "markers",
        marker: {
            size: sampleValues,
            //color: otuIDS,
        },
        //text: otu_labels,
    }];

    Plotly.newPlot("bubble", bubbleTrace);

})
}




