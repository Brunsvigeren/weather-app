//*Date, time, month, year etc.
function formatDate(date) {
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinute = date.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }

  let days = ["Sun", "Mun", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let currentYear = date.getFullYear();
  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();
  let fullCurrentDate = `${currentDay} - ${currentMonth} ${currentDate} - ${currentYear} - ${currentHour}:${currentMinute}`;

  return fullCurrentDate;
}

let dateElement = document.querySelector("#date-and-time");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

//Search engine - two functions (showWeather and searchCity)

function showWeather(response) {
  console.log(response.data);
  let showTemperature = document.querySelector("#temp");
  showTemperature.innerHTML = Math.round(response.data.main.temp);
  let showWind = document.querySelector("#wind-speed");
  showWind.innerHTML = Math.round(response.data.wind.speed);
  let showHumidity = document.querySelector("#humidity");
  showHumidity.innerHTML = Math.round(response.data.main.humidity);
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = response.data.name;
}

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let units = "metric";
  let apiKey = "c7f4649fa1bab9096cc8bdc788602750";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

let newCity = document.querySelector("#search-form");
newCity.addEventListener("submit", searchCity);

// Current location

function getCurrentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "c7f4649fa1bab9096cc8bdc788602750";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);

  axios.get(apiUrl).then(showCurrentWeather);
}

function showCurrentWeather(response) {
  let currentTemp = document.querySelector("#temp");
  currentTemp.innerHTML = Math.round(response.data.main.temp);
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = response.data.name;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = Math.round(response.data.main.humidity);
  let currentWind = document.querySelector("#wind-speed");
  currentWind.innerHTML = Math.round(response.data.wind.speed);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentPosition);
}

let currentCityButton = document.querySelector("#current-button");
currentCityButton.addEventListener("click", getCurrentLocation);

function onLoadCurrentLocation() {
  navigator.geolocation.getCurrentPosition(getCurrentPosition);
}

window.onload = onLoadCurrentLocation();

/*Change to Fahrenheit and Celsius*/
