let locationbox = document.querySelector("#searchbox");
let searchbtn = document.querySelector("#search");
let city_err = document.querySelector(".city-error");
let search_city = document.querySelector(".search-city");
let weather = document.querySelector(".weather-climate-details")
search.addEventListener("click", () => {
    if (locationbox.value == "") {
        city_err.style.display = "";
        weather.style.display = "none";
    } else {
        console.log(locationbox.value);
        locationbox.value = "";
        city_err.style.display = "none";
        weather.style.display = "";
    }
    search_city.style.display = "none";
})
locationbox.addEventListener("keydown", (evt) => {
    if (evt.key == "Enter") {
        if (locationbox.value == "") {
            city_err.style.display = "";
            weather.style.display = "none";
        } else {
            console.log(locationbox.value);
            locationbox.value = "";
            city_err.style.display = "none";
            weather.style.display = "";
        }
        search_city.style.display = "none";
    }
})