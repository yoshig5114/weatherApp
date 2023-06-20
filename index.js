
//Access toggle switch HTML element
var themeSwitcher = document.querySelector("#theme-switcher");
var unit = document.querySelector(".unit");

// Set default mode to dark
var mode = "F";

// Listen for a click event on toggle switch
themeSwitcher.addEventListener("click", function() {
  // If mode is dark, apply light background
  if (mode === "F") {
    mode = "C";
    unit.setAttribute("class", "light");
  }
  // If mode is light, apply dark background 
  else {
    mode = "F";
    unit.setAttribute("class", "dark");
  }
});

