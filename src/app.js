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
  let timeElement = document.querySelector("#time");
  let dateTime = new Date(); // using response.data.time * 1000 gives a time lag for some cities as time ranges up to 5 mins either way
  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="selected-city-icon"/>`;

  cityElement.innerHTML = city;
  temperatureElement.innerHTML = Math.round(temperature);
  conditionElement.innerHTML = condition;
  humidityElement.innerHTML = `${humidity}%`;
  windElement.innerHTML = `${wind}km/h`;
  timeElement.innerHTML = formatDate(dateTime);
}

function formatDate(dateTime) {
  let currentMinutes = ("0" + dateTime.getMinutes()).slice(-2);
  let currentHours = ("0" + dateTime.getHours()).slice(-2);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dateTime.getDay()];

  return `${day} ${currentHours}:${currentMinutes}`;
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
