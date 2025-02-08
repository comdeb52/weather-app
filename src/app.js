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
  let dateTime = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = city;
  temperatureElement.innerHTML = Math.round(temperature);
  conditionElement.innerHTML = condition;
  humidityElement.innerHTML = `${humidity}%`;
  windElement.innerHTML = `${wind}km/h`;
  timeElement.innerHTML = formatDate(dateTime);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="selected-city-icon"/>`;

  getForecast(response.data.city);
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "7t430af5962198oce5dea3144944bb3b";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml += ` 
  <div class="daily-forecast">
    <div class="forecast-day-name">${formatDay(day.time)}</div>
    
    <img src = "${day.condition.icon_url}" class="forecast-day-icon"/>
   
    <div class="forecast-day-temps">
      <div class="forecast-day-temp">
        <strong>${Math.round(day.temperature.maximum)}°</strong>
      </div>
      <div class="forecast-day-temp">${Math.round(
        day.temperature.minimum
      )}°</div>
    </div>
  </div>`;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let citySearchElement = document.querySelector("#city-search-form");
citySearchElement.addEventListener("submit", handleSearchSubmit);

searchCity("Glasgow");
