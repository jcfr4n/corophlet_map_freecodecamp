// jshint esversion:6

let countyUrl = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json';

let educationUrl = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json';


let countyData;
let educationData;

let canvas = d3.select('#canvas');

let drawMap = () => {

    canvas.selectAll('path')
            .data(countyData)
            .enter()
            .append('path')
            .attr('d',d3.geoPath())
            .attr('class', 'county')
            .attr('fill', (countyDataItem) => {

                let id = countyDataItem.id;

                let county = educationData.find((item) => {
                    return item.fips === id;
                });

                let percentage = county.bachelorsOrHigher;
                if (percentage <= 15) {
                    return 'tomato';
                } else if (percentage <= 30) {
                    return 'orange';
                }else if (percentage <= 45) {
                    return 'yellow';
                }else if (percentage <= 60) {
                    return 'limegreen';
                }else {
                    return 'blue';
                }

            });

};

d3.json(countyUrl)
    .then((data, error) => {
        if (error) {
            console.log(error);
        }else{
            countyData = topojson.feature(data, data.objects.counties).features;
            console.log('county boooom');
            console.log(countyData);

            d3.json(educationUrl)
                .then((data, error) => {
                    if (error) {
                        console.log(error);
                    }else{
                        educationData = data;

                        drawMap();
                    }
                });
        }
    });