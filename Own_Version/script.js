// jshint esversion:6

/**
 *  Coded by: Juan Carlos Francisco Mesa.
 * 
 * 
 * I followed the video at: https://www.youtube.com/watch?v=ha1toFtBfF8 and made some changes in order to personalize the result.
 * 
 *  You can see the code at: 
 * 
 * https://codepen.io/jcfr4n/full/YzYLEoZ or 
 * https://github.com/jcfr4n/corophlet_map_freecodecamp
 * 
 */

// Init vars.

let countyUrl =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";

let educationUrl =
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";

let countyData;
let educationData;

// Define canvas element

let canvas = d3.select("#canvas");

// Define tooltip element

let tooltip = d3
  .select("#main")
  .append("div")
  .attr("id", "tooltip")
  .style("opacity", 0);

// Define the function drawMap that is called once the data was downloaded from theri respectives pages

let drawMap = () => {
  canvas
    .selectAll("path")
    .data(countyData)
    .enter()
    .append("path")
    // This is a function from topojson library, which create the points that define each county
    .attr("d", d3.geoPath())
    .attr("class", "county")
    .attr("fill", (countyDataItem) => {
      let id = countyDataItem.id;

      let county = educationData.find((item) => {
        return item.fips === id;
      });

      let percentage = county.bachelorsOrHigher;
      if (percentage <= 15) {
        return "tomato";
      } else if (percentage <= 30) {
        return "orange";
      } else if (percentage <= 45) {
        return "yellow";
      } else if (percentage <= 60) {
        return "limegreen";
      } else {
        return "blue";
      }
    })
    .attr("data-fips", (countyDataItem) => {
      return countyDataItem.id;
    })
    .attr("data-education", (countyDataItem) => {
      let id = countyDataItem.id;

      let county = educationData.find((item) => {
        return item.fips === id;
      });

      let percentage = county.bachelorsOrHigher;
      return percentage;
    })
    // Define the behavoir when the mouse is over each county
    .on("mouseover", (event, countyDataItem) => {
      tooltip.transition().duration(500).style("opacity", 0.9);

      let id = countyDataItem.id;

      let county = educationData.find((item) => {
        return item.fips === id;
      });
// This makes visible the tooltips
      tooltip
        .html(
          county.fips +
            " - " +
            county.area_name +
            ", " +
            county.state +
            " : " +
            county.bachelorsOrHigher +
            "%"
        )
        .attr("data-education", county.bachelorsOrHigher)
        .style("left", event.pageX + 30 + "px")
        .style("top", event.pageY - 30 + "px");
    })
    // Define the behavoir when the mouse is out of each county
    .on("mouseout", (countyDataItem) => {
      tooltip.transition().style("opacity", 0);
    });
};
// this init the request of the data and evently call the drawMap function
d3.json(countyUrl).then((data, error) => {
  if (error) {
    console.log(error);
  } else {
    countyData = topojson.feature(data, data.objects.counties).features;

    d3.json(educationUrl).then((data, error) => {
      if (error) {
        console.log(error);
      } else {
        educationData = data;

        drawMap();
      }
    });
  }
});
