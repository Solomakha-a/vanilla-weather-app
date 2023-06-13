function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];
    return `Last updated: ${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
let date = new Date(timestamp * 1000);

let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
let day = days[date.getDay()];

return day;

}

function displayForecast(response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class = "row">`;
    
    forecast.forEach(function (forecastDay, index) {
        if (index < 6) {
forecastHTML = forecastHTML + `<div class="col-2">
                <div class="weather-forecast-day">${formatDay(forecastDay.time)}</div>
                <img
                  src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png"
                  alt=""
                  width="50"
                />
                <div class="weather-forecast-temp">
                  <span class="weather-forecast-temp-max"> ${Math.round(forecastDay.temperature.maximum)}° </span>
                  <span class="weather-forecast-temp-min"> ${Math.round(forecastDay.temperature.minimum)}° </span>
                </div>
            </div>`;}
    })
    
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
    
            
      
}

function getForecast(coordinates) {
    console.log(coordinates);
    let apiKey = "4o2b1et2ad8780b3de6b1ffa54355c3a";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}`;
    console.log(apiUrl);
    axios.get(apiUrl).then(displayForecast);
}
    
function showLocation(position) {
  let apiKey = "4o2b1et2ad8780b3de6b1ffa54355c3a";
  //let lon = position.coords.longitude;
  //let lat = position.coords.latitude;
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}

function displayTemperature(response) {
    celsiusTemperature = response.data.temperature.current;
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    let cityElement = document.querySelector("#query");
    cityElement.innerHTML = response.data.city;
    let conditionElement = document.querySelector("#condition");
    conditionElement.innerHTML = response.data.condition.description;
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = `Humidity ${response.data.temperature.humidity}%`;
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = `Wind ${Math.round(response.data.wind.speed)} km/h`;
    let dateElement = document.querySelector("#date");
    dateElement.innerHTML = formatDate(response.data.time * 1000);
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute ("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
    iconElement.setAttribute("alt", response.data.condition.description);
  
    getForecast(response.data.coordinates);
}

function search(city) {
    let apiKey = "4o2b1et2ad8780b3de6b1ffa54355c3a";
    let apiUrl =`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}


function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}


function getCurrentPosition() {
navigator.geolocation.getCurrentPosition(showLocation);
}



let button = document.querySelector("#current-location");
button.addEventListener("click", getCurrentPosition);






let celsiusTemperature = null;

let form = document.querySelector("#search-input");
form.addEventListener("submit", handleSubmit);

search("London");
