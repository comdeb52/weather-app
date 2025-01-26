function handleSearchSubmit(event) {
  event.preventDefault();
  let searchCityInput = document.querySelector("#search-city-input");
  let cityElement = document.querySelector("#selected-city");
  cityElement.innerHTML = searchCityInput.value;
}

let citySearchElement = document.querySelector("#city-search-form");
citySearchElement.addEventListener("submit", handleSearchSubmit);
