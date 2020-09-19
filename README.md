### Belly Button Biodiversity

Thanks for checking out my project's repo! By downloading this repo, you'll be able to observe interactive dashboards on the diversity of microbes in test subjects' belly buttons. Also, you'll be able to observe demographic information about the people involved in this study. To learn more about this study, check out: [ Belly Button Biodiversity ](http://robdunnlab.com/projects/belly-button-biodiversity/) <br>

<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Project Instructions](#project-instructions)

<!--About the Project-->
## About the Project

By choosing a test subject ID number from the drop down menu, you'll be able to view three interactive charts and demographic information for that subject. <br>

The first chart is a horizontal bar graph with the top 10 OTUs found in that individual. Here is an example:
![alt text](images/BarGraphEx.png)<br>

The second chart is a bubble chart that displays the OTU IDs and sample values for that individual. Here is an example:
![alt text](images/BubbleChartEx.png)<br>

The third chart is a gauge chart that displays belly button washing frequency per week of the individual. Here is an example:
![alt text](images/GaugeEx.png)<br>

The demographic information provides you with more details about the test subject. Here is an example:
![alt text](images/DemoInfoEx.png)<br>




<!--Project Instructions-->
## Project Instructions

In this assignment, you will build an interactive dashboard to explore the Belly Button Biodiversity dataset, which catalogs the microbes that colonize human navels.<br>
The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

### Step 1: Plotly

1. Use the D3 library to read in samples.json.

2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

* Use sample_values as the values for the bar chart.
* Use otu_ids as the labels for the bar chart.
* Use otu_labels as the hovertext for the chart.




