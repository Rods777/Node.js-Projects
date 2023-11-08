var fetchWeather = "/weather";

const weatherQuery = document.querySelector('form');
const searchInput = document.querySelector('input');

const weatherIcon = document.querySelector('.weatherIcon i');
const weatherCondition = document.querySelector('.weatherCondition');
const temperature = document.querySelector('.temperature span');
const placeLocation = document.querySelector('.place');

const date = document.querySelector('.date');
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
date.textContent = new Date().getDate() + ", " + monthNames[new Date().getMonth()].substring(0, 3); // Built-in JS Date Function



weatherQuery.addEventListener('submit', (event) => {
    event.preventDefault();
    placeLocation.textContent = "Loading...";
    temperature.textContent = ""; // Empty's Data for the next search
    weatherCondition.textContent = "";
    const locationAPI = fetchWeather + "?address=" + searchInput.value; // Gets the location of the API depending on search in URL
    fetch(locationAPI).then(response => { // Fetch and returns the data in response from API
        response.json().then(data => { // Converts the response in JSON format
            // Check for errors while searching
            if(data.error){
                placeLocation.textContent = data.error;
                temperature.textContent = "";
                weatherCondition.textContent = "";
            }else{
                // Displaying Icons
                if(data.description === "rain" || data.description === "fog"){
                    weatherIcon.className = "wi wi-day-" + data.description;
                } else if(data.description === "clear sky"){
                    weatherIcon.className = "wi wi-day-sunny";
                }
                else {
                    weatherIcon.className = "wi wi-day-cloudy";
                }
                // Returns/Display the data from API(JSON)
                placeLocation.textContent = data.cityName;
                temperature.textContent = Math.round((data.temperature - 273.5).toFixed(2)) + String.fromCharCode(176) + "C"; // Computes to convert Kelvin into Celcius
                weatherCondition.textContent = data.description.toUpperCase();
            }
        })
    })
})