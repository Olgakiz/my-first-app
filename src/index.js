function updateDate(date) {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
  
    let currentDay = days[date.getDay()];
  
    let currentHours = date.getHours();
    if (currentHours < 10) {
      currentHours = `0${currentHours}`;
    }
  
    let currentMinutes = date.getMinutes();
    if (currentMinutes < 10) {
      currentMinutes = `0${currentMinutes}`;
    }
  
    let dayAndTime = `${currentDay} ${currentHours}:${currentMinutes}`;
    return dayAndTime;
  }
  
  let now = new Date();
  let currentTime = document.querySelector("#current-time");
  currentTime.innerHTML = updateDate(now);
  
  function showWeather(response) {
    let city = response.data.name;
    let cityElement = document.querySelector("#current-city");
    cityElement.innerHTML = city;
    let temperature = Math.round(response.data.main.temp);
    let tempElement = document.querySelector("#temp-value");
    tempElement.innerHTML = temperature;
    let humidity = response.data.main.humidity;
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = humidity;
    let wind = Math.round(response.data.wind.speed);
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = wind;
    let description = response.data.weather[0].main;
    let descriptionElement = document.querySelector("#weather-description");
    descriptionElement.innerHTML = description;
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);


  celsiusTemperature = response.data.main.temp;
  
  }
  
  function searchCity(city) {
    let apiKey = "e97030c631d464199a280151bfa20f4c";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
    //console.log(apiUrl);
    axios.get(apiUrl).then(showWeather);
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
  
    if (city) {
      searchCity(city);
    } else {
      city = null;
      alert("Please type a city");
    }
  }
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", handleSubmit);
  
  function determinePosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let units = "metric";
    let apiKey = "e97030c631d464199a280151bfa20f4c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showWeather);
  }
  
  function getLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(determinePosition);
  }
  
  let currentLocationButton = document.querySelector("#current-location-button");
  currentLocationButton.addEventListener("click", getLocation);
  
searchCity("Lviv");
  

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temp-value");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp-value");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}
let celsiusTemperature = null;
