// Use d3.json() to fetch data from JSON file
// Incoming data is internally referred to as incomingData
// Appending sample IDs to dropdown

function init() {

    d3.json("data/samples.json").then((incomingData) => {
        var dropDown = d3.select('#selDataset');
        //console.log(incomingData);
        incomingData.names.forEach((name) => {
            dropDown.append('option').text(name).property('value', name);
        });
        // Grabbing first ID.
        var firstID = incomingData.names[0];
        // Running function on first ID to create initial dashboard.
        optionChanged(firstID);
    });
};

// Function called in html to dynamically change dashboard based on Test Subject ID drop down chosen.
function optionChanged(values) {

    // Pulling in data and creating function.
    d3.json("data/samples.json").then((incomingData) => {

        // Storing samples list of dictionaries to variable.
        var samples = incomingData.samples
        //console.log(samples);

        // Filter to match Subject ID in drop down with samples list of dictionaries in data file.
        var sampleIDFilter = samples.filter(value => value.id == values);
        //console.log(sampleIDFilter);

        // Storing subject ID into variable.
        var subjectID = sampleIDFilter[0].id
        //console.log(subjectID);

        // Storing dictionary of matching subject ID into variable.
        var result = sampleIDFilter[0];
        //console.log(result);

        // Storing OTU IDs to variable.
        var otuIDs = result.otu_ids;
        //console.log(otuIDs);

        // Storing OTU Labels to variable.
        var otuLabels = result.otu_labels;
        //console.log(otulabels);

        // Storing Sample Values to variable.
        var sampleValues = result.sample_values;
        //console.log(sampleValues);    

        // Slicing OTU IDs and mapping them to array for yticks.
        var yticks = otuIDs.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
        //console.log(yticks);

        // Bar graph trace.
        var barTrace = [{
            x: sampleValues.slice(0, 10).reverse(),
            y: yticks,
            text: otuLabels.slice(0, 10).reverse(),
            type: "bar",
            orientation: 'h',
            marker: {
                color: 'rgba(18,162,169,.75)',
            }
        }];

        // Define the bar graph layout.
        var barLayout = {
            title: `<b> Top 10 OTUs for Subject ID: ${subjectID} </b>`,
            xaxis: { title: "<b>Sample Values</b>" },
            yaxis: {
                title: "<b>OTUs</b>",
                showticklabels: true
            }
        };

        Plotly.newPlot("bar", barTrace, barLayout);

        // Bubble chart trace.
        var bubbleTrace = [{
            x: otuIDs,
            y: sampleValues,
            mode: "markers",
            marker: {
                size: sampleValues,
                color: otuIDs,
                colorscale: 'Viridis',

            },
            text: otuLabels,
        }];

        Plotly.newPlot("bubble", bubbleTrace);

        // Demographic information
        var info = d3.select('#sample-metadata');
        // console.log(info);
        info.html('');
        var metadata = incomingData.metadata;
        console.log(metadata);

        var metaIDFilter = metadata.filter(value => value.id == values);
        console.log(metaIDFilter[0]);

        Object.entries(metaIDFilter[0]).forEach(([key, value]) => {
            if (key === 'id'){
                key = key.toUpperCase(); // bold?
            }
            else {
                 key = key.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase());
             };
    
            info.append('h6').text(`${key}:${value}`);
        });


        // Gauge chart.
        
        var washFreq = metaIDFilter[0].wfreq;

        var gaugeTrace = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: washFreq,
                        color: "white",
                title: { text: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week",
                        //horizontalAlignment: "center",
                        //verticalAlignment: "top",
            
            },
                type: "indicator",
                mode: "gauge+number",
                gauge: {
                    axis: { range: [null, 9] },
                    steps: [
                      { range: [0, 1], color: "rgba(53, 53, 165, 0.0)" },
                      { range: [1, 2], color: "rgba(53, 53, 165, 0.1)" },
                      { range: [2, 3], color: "rgba(53, 53, 165, 0.2)" },
                      { range: [3, 4], color: "rgba(53, 53, 165, 0.3)" },
                      { range: [4, 5], color: "rgba(53, 53, 165, 0.4)" },
                      { range: [5, 6], color: "rgba(53, 53, 165, 0.5)" },
                      { range: [6, 7], color: "rgba(53, 53, 165, 0.6)" },
                      { range: [7, 8], color: "rgba(53, 53, 165, 0.7)" },
                      { range: [8, 9], color: "rgba(53, 53, 165, 0.8)" },
                      { range: [8, 9], color: "rgba(53, 53, 165, 0.9)" },

                    ]}
                  
                
        }
        ];
        
        
        var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
        
         Plotly.newPlot("gauge", gaugeTrace, layout); //, gaugeLayout);

    });
};

// Initializing dashboard.
init();
