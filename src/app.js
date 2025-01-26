function reviseWeather(response) {
  let cityElement = document.querySelector("#selected-city");
  let city = response.data.city;
  let temperatureElement = document.querySelector("#callout-temp");
  let temperature = response.data.temperature.current;
  let conditionElement = document.querySelector("#condition");
  let condition = response.data.condition.description;
  let humidityElement = document.querySelector("#humidity");
  let humidity = response.data.temperature.humidity;
  let windElement = document.querySelector("#wind");
  let wind = response.data.wind.speed;

  cityElement.innerHTML = city;
  temperatureElement.innerHTML = Math.round(temperature);
  conditionElement.innerHTML = condition;
  humidityElement.innerHTML = humidity;
  windElement.innerHTML = Math.round(wind);
}

function searchCity(city) {
  let apiKey = "7t430af5962198oce5dea3144944bb3b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(reviseWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchCityInput = document.querySelector("#search-city-input");
  searchCity(searchCityInput.value);
}

let citySearchElement = document.querySelector("#city-search-form");
citySearchElement.addEventListener("submit", handleSearchSubmit);

searchCity("London");
