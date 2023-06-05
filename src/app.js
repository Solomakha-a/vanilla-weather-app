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




function displayTemperature(response) {
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

    celsiusTemperature = response.data.temperature.current;
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

function displayFarTemperature(event) {
    event.preventDefault();
    let farTemperature = (celsiusTemperature * 9) / 5 + 32;
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(farTemperature);
    celLinkElement.classList.remove("active");
    farLinkElement.classList.add("active");
}

function displayCelTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
    celLinkElement.classList.add("active");
    farLinkElement.classList.remove("active");
}


let celsiusTemperature = null;

let form = document.querySelector("#search-input");
form.addEventListener("submit", handleSubmit);

let farLinkElement = document.querySelector("#far-link");
farLinkElement.addEventListener("click", displayFarTemperature);

let celLinkElement = document.querySelector("#celsius-link");
celLinkElement.addEventListener("click", displayCelTemperature);

search("London");