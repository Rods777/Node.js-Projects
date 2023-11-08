// Weather API

const request = require("request"); // Calls the API
const constants = require("../config");

const weatherData = (address, callback) => {
    const url = constants.openWeatherMap.BASE_URL + encodeURIComponent(address) + '&appid=' + constants.openWeatherMap.SECRET_KEY; // validates text string for URI
    request({url, json:true}, (error, {body}) => { // Gets the JSON data from API
        if(error){
            callback("Can't fetch data from Open Weather Map API", undefined);
        } 
        else if(!address) { // Checks if user inputted in search bar
            callback("Please enter address/location in search bar", undefined);
        }
        else if(!body.main || !body.main.temp || !body.name || !body.weather){ //If the data from JSON doesn't exist
            callback("Gawa gawa ng location ah? Ayusin mo naman", undefined);
        } 
        else{
            callback(undefined, { // Fetches the data from JSON
                temperature: body.main.temp,
                description: body.weather[0].description,
                cityName: body.name
            });
        }
    })
}

module.exports = weatherData;