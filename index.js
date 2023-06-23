var themeSwitcher = document.querySelector("#theme-switcher");
var unit = document.querySelector(".unit");

var mode = "F";

themeSwitcher.addEventListener("click", function () {
  if (mode === "F") {
    mode = "C";
    unit.setAttribute("class", "light");
  } else {
    mode = "F";
    unit.setAttribute("class", "dark");
  }
});

var searchInput = document.querySelector("#locationSearchInput");
var searchSubmit = document.querySelector("#searchSubmit");
var saveLocation = document.querySelector("#saveLocationButton");

// searchSubmit.addEventListener("click", function(event) {
//   event.preventDefault();
//   var location = searchInput.value;
// })

const apiKey = "3c42ee32d7e58fdf6e213e4e64ca4a86";

// function displayWeather(fetchedData) {
//   var location = fetchedData.name;
//   var temperature = fetchedData.main.temp;
//   var feelsLike = fetchedData.main.feels_like;
//   var humidity = fetchedData.main.humidity;
//   var windSpeed = fetchedData.wind.speed;
//   var icon = fetchedData.weather[0].icon;
//   var description = fetchedData.weather[0].description;
//   var locationPar = document.querySelector("#location");
//   var tempPar = document.querySelector("#temp");
//   var feelsLikePar = document.querySelector("#feelsLike");
//   var humidityPar = document.querySelector("#humidity");
//   var windSpeedPar = document.querySelector("#windSpeed");
//   var iconPar = document.querySelector("#icon");
//   var descriptionPar = document.querySelector("#description");
//   locationPar.textContent = location;
//   tempPar.textContent = temperature;
//   feelsLikePar.textContent = feelsLike;
//   humidityPar.textContent = humidity;
//   windSpeedPar.textContent = windSpeed;
//   iconPar.setAttribute("src", `https://openweathermap.org/img/wn/${icon}.png`);
//   descriptionPar.textContent = description;
// }

searchSubmit.addEventListener("click", function (event) {
  event.preventDefault();
  var location = searchInput.value;
  if (mode === "F") {
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${apiKey}`;
  } else {
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
  }
  fetch(url)
    .then((response) => {
      return response.json();
      console.log(response);
    })
    .then((data) => {
      var fetchedData = data;
      return fetchedData;
      console.log(data);
      searchInput.value = "";
    })
    .catch((error) => {
      console.log(error);
      feedBackPar.textContent = "Error: " + error;
    });
});
