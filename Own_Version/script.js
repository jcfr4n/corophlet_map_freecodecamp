// jshint esversion:6

let countyUrl = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json';

let educationUrl = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json';


let countyData;
let educationData;

let canvas = d3.select('#canvas');

d3.json(countyUrl)
    .then((data, error) => {
        if (error) {
            console.log(error);
        }else{
            countyData = data;
            console.log('county boooom');
            console.log(countyData);

            d3.json(educationUrl)
                .then((data, error) => {
                    if (error) {
                        console.log(error);
                    }else{
                        educationData = data;
                        console.log('Education:' + educationData);
                    }
                });
        }
    });