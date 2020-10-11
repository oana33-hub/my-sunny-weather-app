let current = new Date();


let h3 = document.querySelector("h3");


let date = current.getDate();
let hours = current.getHours();
let minutes = current.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let year = current.getFullYear();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[current.getDay()];
let months = ["Jan", "Feb", "Mar", "May", "Apr", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let month = months[current.getMonth()];



h3.innerHTML = `${day} ${month} ${date}, ${hours}:${minutes}, ${year}`;

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let h4 = document.querySelector("h4");
  if (searchInput.value) {
    h4.innerHTML = `Searching for ${searchInput.value}...`;
  } else {
    h4.innerHTML = null;
    alert("Please type a city");
  }
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);



function celsius(event) {
  event.preventDefault();
  let celsiusTemp = document.querySelector("#temperature");
  celsiusTemp.innerHTML = "23";
}

function fahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemp = document.querySelector("#temperature");
  fahrenheitTemp.innerHTML = "70";
}
let tempCelsius = document.querySelector("#celsius-link");
tempCelsius.addEventListener("click", celsius);
let tempFahrenheit = document.querySelector("#fahrenheit-link");
tempFahrenheit.addEventListener("click", fahrenheit);






function showTemperature(response) {
  console.log();
  let city = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let h1 = document.querySelector("h1");
  h1.innerHTML = ` ${temperature}°C in ${city} `;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;


}


function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let units = "metric";
  let apiKey = "71d6dfd3b336163612f9cfac0fa5a0ed";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = ` ${apiEndPoint}?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;

  console.log(apiUrl);

  axios.get(apiUrl).then(showTemperature);
}

function searchCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function searchCityName(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#city-input");
  let city = searchCity.value;

  let units = "metric";
  let apiKey = "71d6dfd3b336163612f9cfac0fa5a0ed";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndPoint}?q= ${city}&appid=${apiKey}&units=${units}`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}


function submit(event) {
  let city = document.querySelector("#city-input").value;
  searchCityName(city);
  9
}



let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCityName);

let locationButton = document.querySelector("#current-location-button");
locationButton.addEventListener("click", searchCurrentLocation);