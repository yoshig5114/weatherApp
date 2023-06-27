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
const gifKey = "wyCA4MYBH9Wyq6rYzEUSh8BVCMTl07qQ"
// searchSubmit.addEventListener("click", function(event) {
//   event.preventDefault();
//   var location = searchInput.value;
// })
feedBackPar = "";
const myKey = "c31b2cdb1c614d8d692ea6d6d1a4d3b0";
const imgElement = document.querySelector("#image")

function displayWeather(fetchedData) {
  var location = fetchedData.name;
  var temperature = fetchedData.main.temp;
  var feelsLike = fetchedData.main.feels_like;
  var humidity = fetchedData.main.humidity;
  var windSpeed = fetchedData.wind.speed;
  var icon = fetchedData.weather[0].icon;
  var description = fetchedData.weather[0].description;
  
  var locationPar = document.querySelector("#location");
  var tempPar = document.querySelector("#temp");
  var feelsLikePar = document.querySelector("#feelsLike");
  var humidityPar = document.querySelector("#humidity");
  var windSpeedPar = document.querySelector("#windSpeed");
  var iconPar = document.querySelector("#icon");
  var descriptionPar = document.querySelector("#description");
  locationPar.textContent = "";
  tempPar.textContent = "";
  feelsLikePar.textContent = "";
  humidityPar.textContent = "";
  windSpeedPar.textContent = "";
  descriptionPar.textContent = "";
  locationPar.textContent += "location name: " +  location;
  tempPar.textContent += "temperature: " + temperature;
  feelsLikePar.textContent += "feels like: " + feelsLike;
  humidityPar.textContent += "humidity: " + humidity;
  windSpeedPar.textContent += "wind speed: " + windSpeed;
  //iconPar.setAttribute("src", `https://openweathermap.org/img/wn/${icon}.png`);
  descriptionPar.textContent += "weather: " +  description;
  feedBackPar.textContent = "";
  saveLocation.textContent = location;
  //var description = fetchedData.weather[0].description;
    fetch(`https://api.giphy.com/v1/gifs/translate?api_key=${gifKey}&s=${description}`, {mode: "cors"})

    .then((response) => {
        return response.json()
        console.log(response)
    })
    .then((res) => {
        imgElement.src = res.data.images.original.url 
        searchInput.value = ""
    })
    .catch((err) =>{
        console.log(err)
        feedBackPar.textContent = err.message
    })
  return location;
}

searchSubmit.addEventListener("click", function (event) {
  event.preventDefault();
  var location = searchInput.value;
  if (mode === "F") {
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${myKey}`;
  } else {
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${myKey}`;
  }
  fetch(url)
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      let fetchedData = data;
      console.log(data);
      searchInput.value = "";
      displayWeather(fetchedData);
      return fetchedData;
    })
    .catch((error) => {
      console.log(error);
      feedBackPar.textContent = "Error: " + error;
    });
    
});

class SelectedAreas {
  constructor(name) {
    this.name = name;
    this.savedLocations = [];
    this.savedLocationsList = document.querySelector("#savedLocParent");
  }
  updateList() {
    this.savedLocationsList.innerHTML = "";
    for (const location of this.savedLocations) {
      const listItem = document.createElement("li");
      listItem.textContent = location;

      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", () => {
        this.removeLocation(location);
      });

      const updateButton = document.createElement("button");
      updateButton.textContent = "Update";
      updateButton.addEventListener("click", () => {
        this.updateLocationData(location);
      });

      const currentTime = new Date();
      const timestampSpan = document.createElement("span");
      timestampSpan.setAttribute("class", "timestamp");
      timestampSpan.textContent = `Last Update: ${currentTime.toLocaleString()}`;

      listItem.appendChild(removeButton);
      listItem.appendChild(updateButton);
      listItem.appendChild(timestampSpan);
      this.savedLocationsList.appendChild(listItem);
    }
  }

  addLocation(name) {
    if (!this.savedLocations.includes(name)) {
    this.savedLocations.push(name);
    console.log(`Location '${name}' saved.`);
    this.updateList();
  }
    else {
    console.log(`Location '${name}' is already saved.`);
  }
}
  removeLocation(name) {
    const index = this.savedLocations.indexOf(name);
    if (index > -1) {
      this.savedLocations.splice(index, 1);
      this.updateList();
    }
  }
  updateLocationData(location) {
    if (mode === "F") {
      var url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${myKey}`;
    } else {
      var url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${myKey}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let fetchedData = data;
      console.log(data);
      searchInput.value = "";
      displayWeather(fetchedData);
        const listItems = this.savedLocationsList.querySelectorAll("li");
        const currentTime = new Date(); 
        for (const listItem of listItems) {
          if (listItem.textContent === location) {
            const timestampSpan = listItem.querySelector(".timestamp");
            const currentTime = new Date();
            timestampSpan.textContent = `Last Update: ${currentTime.toLocaleString()}`;
            break;
          }
        }
        return fetchedData;
      })
      .catch((error) => {
        console.log(`Error fetching data for '${location}':`, error);
      });
  }
}

const selectedAreas = new SelectedAreas(location);

saveLocation.addEventListener("click", function (event) {
  event.preventDefault();
  var location = saveLocation.textContent;
  selectedAreas.addLocation(location);
})
