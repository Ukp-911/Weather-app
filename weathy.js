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

const display_temperature = (clear_data) => {
    let temp = clear_data.main.temp - 273.15;
    temp = Math.floor(temp * 10) / 10;
    let tempbox = document.querySelector(".temperature");
    tempbox = tempbox.firstElementChild;
    tempbox.innerText = `${temp} °C`;
}

const display_windspeed=(clear_data)=>{
    let windbox=document.querySelector(".wind-condition").querySelector(":nth-child(2)");
    windbox.innerText=`${clear_data.wind.speed} m/s`;
}

const display_place=(clear_data)=>{
    let placebox=document.querySelector(".place").querySelector(":nth-child(2)");
    placebox.innerText=`${clear_data.name}`
}

const display_humid=(clear_data)=>{
    let humidbox=document.querySelector(".climate-condition").querySelector(":nth-child(2)");
    humidbox.innerText=`${clear_data.main.humidity}%`
}

const display_date=(clear_data)=>{
    let datebox=document.querySelector(".date");
    let date = clear_data.dt;
    date = new Date(date * 1000);
    let month = date.getMonth() + 1;      
    let day = date.getDate();
    let year = date.getFullYear();
    datebox.innerText=`${month}/${day}/${year}`;
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
            display_temperature(clear_data);
            display_windspeed(clear_data);
            display_place(clear_data);
            display_humid(clear_data);
            display_date(clear_data);
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