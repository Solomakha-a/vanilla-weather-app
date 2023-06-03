let apiKey = "4o2b1et2ad8780b3de6b1ffa54355c3a";
let apiUrl =`https://api.shecodes.io/weather/v1/current?query=Paris&key=4o2b1et2ad8780b3de6b1ffa54355c3a&units=metric`;
console.log(apiUrl);


function displayTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(response.data.temperature.current);
    let cityElement = document.querySelector("#query");
    cityElement.innerHTML = response.data.city;
    let conditionElement = document.querySelector("#condition");
    conditionElement.innerHTML = response.data.condition.description;
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = `Humidity ${response.data.temperature.humidity}%`;
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = `Wind ${Math.round(response.data.wind.speed)} km/h`;
    
}
axios.get(apiUrl).then(displayTemperature);