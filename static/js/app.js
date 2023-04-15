// Fetch the sample json from online data source
let sample_json = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

// Fill drop down menus from response
initDropDown();

let filter = d3.select('selDataset');

// Initialise drop down using the names data
function initDropDown() {
    d3.json(sample_json).then((data) => {
        var names = data.names;
        var idSelect = document.getElementById('selDataset');
        names.forEach(id => {
            let option = document.createElement('option');
            option.value = id;
            option.text = id;
            idSelect.add(option);
        });

        // Initialise the first plot
        plotCharts(names[0]);
    });
}

// Function for plotting charts
function plotCharts(sample) {
    d3.json(sample_json).then((json_data) => {
        var samples = json_data.samples;
        var sampleDataArray = samples.filter(sampleObject => sampleObject.id == sample);
        var result = sampleDataArray[0];
        var sample_values = result.sample_values;
        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;

        // get top 10 for bar chart
        var xtick = sample_values.slice(0, 10).reverse();
        var ytick = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
        var labels = otu_labels.slice(0, 10).reverse();

        var trace = {
            x: xtick,
            y: ytick,
            text: labels,
            type: 'bar',
            orientation: 'h'
        };
        
        var data = [trace];

        var layout = {
            xaxis: {
                title: 'Sample Size'
            },
            yaxis: {
                title: 'OTU IDs'
            },
            title: 'Top 10 OTUs Found for Test Subject ID ' + sample
        }

        Plotly.newPlot("bar", data, layout);

        // get the data required for the bubble chart
        var xtick_bubble = otu_ids;
        var ytick_bubble = sample_values;
        var labels_bubble = otu_labels;

        var trace = {
            x: xtick_bubble,
            y: ytick_bubble,
            mode: 'markers',
            marker: {
                color: xtick_bubble,
                size: ytick_bubble
            },
            text: labels_bubble
        }

        var data = [trace];

        var layout = {
            xaxis: {
                title: 'OTU IDs'
            },
            yaxis: {
                title: 'Sample Size'
            },
            title: 'Bubble Chart for ' + sample
        }

        Plotly.newPlot("bubble", data, layout);

        // get the data required for metadata
        var metadata = json_data.metadata;
        var metadataArray = metadata.filter(metadataObject => metadataObject.id == sample);
        var metadata_results = metadataArray[0];

        var age = metadata_results.age;
        var bbtype = metadata_results.bbtype;
        var ethnicity = metadata_results.ethnicity;
        var gender = metadata_results.gender;
        var id = metadata_results.id;
        var location = metadata_results.location;
        var wfreq = metadata_results.wfreq;

        // set KVP for metadata section
        var meta_info = `id: ${id} <br> ethnicity: ${ethnicity} <br> gender: ${gender} <br> age: ${age} <br> location: ${location} <br> bbtype: ${bbtype} <br> wfreq: ${wfreq}`

        document.getElementById('sample-metadata').innerHTML = meta_info;

    });
}

// Initiate plot functions on option change from drop down menu
function optionChanged(filter) {
    plotCharts(filter);
};