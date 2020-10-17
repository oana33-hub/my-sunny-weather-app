let current = new Date();


let h3 = document.querySelector("h3");


let date = current.getDate();
let hours = current.getHours();
if (hours<10){
  hours=`0${hours}`;
}
let minutes = current.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let months = ["Jan", "Feb", "Mar", "May", "Apr", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let month = months[current.getMonth()];
let year = current.getFullYear();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[current.getDay()];
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



function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement=document.querySelector("#temperature");
  temperatureElement.innerHTML= Math.round(celsiusTemperature);
  
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature =(celsiusTemperature *9)/5+32;
 let temperatureElement=document.querySelector("#temperature");
 temperatureElement.innerHTML=Math.round(fahrenheitTemperature);
}

let fahrenheitLink= document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click",displayFahrenheitTemperature);
let celsiusLink=document.querySelector("#celsius-link");
celsiusLink.addEventListener("click",displayCelsiusTemperature);
let celsiusTemperature= null;






function showTemperature(response) {
  console.log();
  
  let iconElement=document.querySelector("#icon");
  let city = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let h1 = document.querySelector("#city");
  let description = document.querySelector("#description");
 celsiusTemperature=Math.round(response.data.main.temp);
  h1.innerHTML = ` ${temperature}°C in ${city} `;
  description.innerHTML = response.data.weather[0].description;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
iconElement.setAttribute("src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
iconElement.setAttribute("height","35%");
iconElement.setAttribute("width","35%");
iconElement.setAttribute("alt",response.data.weather[0].description);
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



function displayForecast(response){
  let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = null;
let forecast= null;
for (let index=0; index<5; index++){
  forecast=response.data.list[index];
  forecastElement.innerHTML+=
  
       `
        <div class=row weather-forecast" id="forecast">
       <div class= col>
       <div class="row week-days" id ="days">
 
      
          <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
        <div class="daily-weather">
          ${Math.round(forecast.main.temp)}°C
         </div>  </div>`;
         }

     

   
      
 

    
     
  console.log(response.data.list[0]);
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

  apiUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
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