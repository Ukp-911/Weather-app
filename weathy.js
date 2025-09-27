let locationbox = document.querySelector("#searchbox");
let searchbtn = document.querySelector("#search");
let city_err = document.querySelector(".city-error");
let search_city = document.querySelector(".search-city");
let weather = document.querySelector(".weather-climate-details")

let apikey = "937496b707d135148466ca0f29cad6f9";

const display_onscreen = (value) => {
    if (value === "false") {
        city_err.style.display = "";
        weather.style.display = "none";
        search_city.style.display = "none";
    } else {
        city_err.style.display = "none";
        weather.style.display = "";
        search_city.style.display = "none";
    }
}

const weather_details = async (place) => {
    if (place == "") {
        display_onscreen("false");
    } else {
        let weather_data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${apikey}`);
        let clear_data = await weather_data.json();
        if (clear_data.cod == "404") {
            display_onscreen("false");
        } else if (clear_data.cod == "200") {
            display_onscreen("true");
            let temp = (clear_data.main.temp - 32) * 5 / 9;
            temp = Math.floor(temp * 10) / 10;
            console.log(temp);
            let tempbox=document.querySelector(".temperature");
            tempbox=tempbox.firstElementChild;
            tempbox.innerText=`${temp} °C`;


        } else {
            display_onscreen("false");
        }
    }
}

search.addEventListener("click", () => {
    weather_details(locationbox.value);
})

locationbox.addEventListener("keydown", (evt) => {
    if (evt.key == "Enter") {
        weather_details(locationbox.value);
    }
})