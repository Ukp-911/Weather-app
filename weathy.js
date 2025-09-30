let locationbox = document.querySelector("#searchbox");
let searchbtn = document.querySelector("#search");
let city_err = document.querySelector(".city-error");
let search_city = document.querySelector(".search-city");
let weather = document.querySelector(".weather-climate-details")
let weather_days = document.querySelectorAll(".day");

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

const display_windspeed = (clear_data) => {
    let windbox = document.querySelector(".wind-condition").querySelector(":nth-child(2)");
    windbox.innerText = `${clear_data.wind.speed} m/s`;
}

const display_place = (clear_data) => {
    let placebox = document.querySelector(".place").querySelector(":nth-child(2)");
    placebox.innerText = `${clear_data.name}`
}

const display_humid = (clear_data) => {
    let humidbox = document.querySelector(".climate-condition").querySelector(":nth-child(2)");
    humidbox.innerText = `${clear_data.main.humidity}%`
}

const display_icons = (clear_data) => {
    let iconbox = document.querySelector(".cloud > span");
    let tempbox = document.querySelector(".temperature > h2");

    if (clear_data.weather[0].id <= 232) {
        iconbox.innerText = "thunderstorm";
        tempbox.innerText = "Thunderstorm";
    } else if (clear_data.weather[0].id <= 321) {
        iconbox.innerText = "rainy";
        tempbox.innerText = "Drizzle";
    } else if (clear_data.weather[0].id <= 531) {
        iconbox.innerText = "rainy_heavy";
        tempbox.innerText = "Heavy rain";
    } else if (clear_data.weather[0].id <= 622) {
        iconbox.innerText = "weather_snowy";
        tempbox.innerText = "Snow";
    } else if (clear_data.weather[0].id <= 781) {
        iconbox.innerText = "air";
        tempbox.innerText = "Atmosphere";
    } else if (clear_data.weather[0].id == 800) {
        iconbox.innerText = "clear_day";
        tempbox.innerText = "Clear";
    } else if (clear_data.weather[0].id <= 804) {
        iconbox.innerText = "cloud";
        tempbox.innerText = "Cloudy";
    }
}

const display_date = (clear_data) => {
    let datebox = document.querySelector(".date");
    let date = clear_data.dt;
    date = new Date(date * 1000);
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let year = date.getFullYear();
    datebox.innerText = `${month}/${day}/${year}`;
}

/* current date fetching*/
function formatDate(timestamp) {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
/* end of current date fetching*/

const weather_details = async (place) => {
    if (place == "") {
        display_onscreen("false");
    } else {
        let weather_data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${apikey}`);
        let clear_data = await weather_data.json();
        let forecast_data = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${apikey}&units=metric`);
        let clear_forecast = await forecast_data.json();
        if (clear_data.cod == "404") {
            display_onscreen("false");
        } else if (clear_data.cod == "200") {
            display_onscreen("true");
            display_temperature(clear_data);
            display_windspeed(clear_data);
            display_place(clear_data);
            display_humid(clear_data);
            display_date(clear_data);
            display_icons(clear_data);


            let curr_date = formatDate(clear_data.dt);
            const result = await weatherforecastinfo(clear_forecast, curr_date);


            locationbox.value = '';
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

function formatToDayMon(dateStr) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let [year, month, day] = dateStr.split("-");
    day = day.padStart(2, '0');
    let shortMonth = months[parseInt(month) - 1];
    return `${day}-${shortMonth}`;
}

const weatherforecastinfo = async (clear_data, curr_date) => {
    let weather_forecasts = [];
    for (const item of clear_data.list) {
        const forecast_data = {};
        if (item.dt_txt.includes("12:00:00") && (!item.dt_txt.includes(curr_date))) {
            let date = item.dt_txt.split(' ')
            date = formatToDayMon(date[0]);
            forecast_data.date = date;
            forecast_data.id = item.weather[0].id;
            forecast_data.temperature = item.main.temp;
            weather_forecasts.push(forecast_data);
        }
    }
    return weather_forecasts;
}