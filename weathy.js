// weathy.js

const locationbox = document.querySelector("#searchbox");
const searchbtn = document.querySelector("#search");
const city_err = document.querySelector(".city-error");
const search_city = document.querySelector(".search-city");
const weather = document.querySelector(".weather-climate-details");
const weather_days = document.querySelectorAll(".day");

// Automatically use backend URL
const backendURL = "http://127.0.0.1:3000"; // Live Preview frontend will fetch from here

// Show/hide UI elements
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
};

// Display temperature
const display_temperature = (clear_data) => {
    let temp = clear_data.main.temp; // in Celsius
    const temp_h1 = document.querySelector(".temperature > h1");
    temp_h1.innerText = `${temp} °C`;
};

// Display wind speed
const display_windspeed = (clear_data) => {
    let windbox = document.querySelector(".wind-condition :nth-child(2)");
    windbox.innerText = `${clear_data.wind.speed} m/s`;
};

// Display place name
const display_place = (clear_data) => {
    let placebox = document.querySelector(".place :nth-child(2)");
    placebox.innerText = `${clear_data.name}`;
};

// Display humidity
const display_humid = (clear_data) => {
    let humidbox = document.querySelector(".climate-condition :nth-child(2)");
    humidbox.innerText = `${clear_data.main.humidity}%`;
};

// Display icons and description
const display_icons = (clear_data) => {
    const iconbox = document.querySelector(".cloud > span");
    const desc_h2 = document.querySelector(".temperature > h2");

    const id = clear_data.weather[0].id;
    const main = clear_data.weather[0].main;

    // Update icon
    if (id <= 232) iconbox.innerText = "thunderstorm";
    else if (id <= 321) iconbox.innerText = "rainy";
    else if (id <= 531) iconbox.innerText = "rainy_heavy";
    else if (id <= 622) iconbox.innerText = "weather_snowy";
    else if (id <= 781) iconbox.innerText = "air";
    else if (id === 800) iconbox.innerText = "clear_day";
    else if (id <= 804) iconbox.innerText = "cloud";

    // Update weather description
    desc_h2.innerText = main; // e.g., "Clear", "Clouds", etc.
};

// Display date
const display_date = (clear_data) => {
    const datebox = document.querySelector(".date");
    const date = new Date(clear_data.dt * 1000);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    datebox.innerText = `${month}/${day}/${year}`;
};

// Fetch weather from backend
const weather_details = async (place) => {
    if (!place) return display_onscreen("false");

    try {
        const response = await fetch(`${backendURL}/api/weather/${place}`);
        const data = await response.json();
        if (data.current.cod === "404") {
            display_onscreen("false");
        } else {
            display_onscreen("true");
            display_temperature(data.current);
            display_windspeed(data.current);
            display_place(data.current);
            display_humid(data.current);
            display_date(data.current);
            display_icons(data.current);

            const result = weatherforecastinfo(data.forecast, formatDate(data.current.dt));
            forecast_icons_display(result);

            locationbox.value = '';
        }
    } catch (err) {
        display_onscreen("false");
        console.error("Error fetching weather:", err);
    }
};

// Event listeners
searchbtn.addEventListener("click", () => weather_details(locationbox.value));
locationbox.addEventListener("keydown", (evt) => {
    if (evt.key === "Enter") weather_details(locationbox.value);
});

// Forecast helpers
function formatDate(timestamp) {
    const date = new Date(timestamp * 1000);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function formatToDayMon(dateStr) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let [year, month, day] = dateStr.split("-");
    return `${day.padStart(2, '0')}-${months[parseInt(month) - 1]}`;
}

const weatherforecastinfo = (clear_data, curr_date) => {
    const weather_forecasts = [];
    for (const item of clear_data.list) {
        if (item.dt_txt.includes("12:00:00") && !item.dt_txt.includes(curr_date)) {
            const date = formatToDayMon(item.dt_txt.split(' ')[0]);
            weather_forecasts.push({
                date,
                id: item.weather[0].id,
                temperature: item.main.temp
            });
        }
    }
    return weather_forecasts;
};

const forecast_icons_display = (data) => {
    let i = 0;
    for (const div of weather_days) {
        div.querySelector(":nth-child(1)").innerText = data[i].date;

        const iconbox = div.querySelector(":nth-child(2)");
        const id = data[i].id;
        if (id <= 232) iconbox.innerText = "thunderstorm";
        else if (id <= 321) iconbox.innerText = "rainy";
        else if (id <= 531) iconbox.innerText = "rainy_heavy";
        else if (id <= 622) iconbox.innerText = "weather_snowy";
        else if (id <= 781) iconbox.innerText = "air";
        else if (id === 800) iconbox.innerText = "clear_day";
        else if (id <= 804) iconbox.innerText = "cloud";

        div.querySelector(":nth-child(3)").innerText = `${data[i].temperature} °C`;
        i++;
    }
};
