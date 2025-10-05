# SkyScout – Weather Forecast Web App

SkyScout is a modern web application that allows users to search for any city and get **current weather conditions** as well as a **5-day forecast**. The app fetches data from the **OpenWeatherMap API** and displays it in a clean, responsive interface.

---

## Features

* Search for any city worldwide.
* View current temperature, weather conditions, humidity, and wind speed.
* See a 5-day weather forecast with temperature and weather icons.
* Responsive design for desktop and mobile devices.
* Friendly error messages for invalid city names.

---

## Demo

You can run the app locally:

```
http://localhost:3000/weather.html
```

---

## Technologies Used

* **Frontend:** HTML, CSS, JavaScript
* **Backend:** Node.js, Express
* **API:** OpenWeatherMap API
* **Packages:** dotenv, cors
* **Fonts & Icons:** Google Fonts, Material Symbols

---

## Project Structure

```
Weather-app/
├── images/             # App icons and images
├── node_modules/       # Node.js packages
├── .env                # API key (ignored by git)
├── .gitignore          # Git ignore file
├── package.json        # Node.js dependencies and scripts
├── package-lock.json   # Locked dependency versions
├── server.js           # Express backend server
├── weather.html        # Frontend HTML
├── weather.css         # CSS styles
└── weathy.js           # Frontend JavaScript
```

---

## Setup & Installation

1. **Clone the repository:**

```bash
git clone <your-repo-url>
cd Weather-app
```

2. **Install dependencies:**

```bash
npm install
```

3. **Create a `.env` file** in the root directory:

```
Apikey=YOUR_OPENWEATHERMAP_API_KEY
```

> Do not commit your `.env` file to GitHub.

4. **Run the server:**

```bash
node server.js
```

5. **Open the app in your browser:**

```
http://localhost:3000/weather.html
```

---

## Usage

* Enter a city name in the search bar.
* Press **Enter** or click the **search icon**.
* Current weather and a 5-day forecast will appear.
* Invalid city names display an error message.

---

## Environment Variables

* `.env` file stores your **OpenWeatherMap API key**:

```
Apikey=YOUR_API_KEY
```

* Make sure this file is **added to `.gitignore`** to prevent exposing your API key.

---

## Git Ignore

Your `.gitignore` should include:

```
node_modules/
.env
.DS_Store
Thumbs.db
.vscode/
npm-debug.log*
```

---

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make changes and test thoroughly.
4. Commit your changes (`git commit -m "Add feature"`).
5. Push to your branch (`git push origin feature-name`).
6. Create a Pull Request.

---
