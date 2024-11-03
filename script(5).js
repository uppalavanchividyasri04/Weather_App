const apiKey = 'a63e07503792d9ae5b27a06bf4602f85';

async function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
            fetchWeatherData(url);
        }, (error) => {
            alert("Geolocation error: " + error.message);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

async function getWeatherByInput() {
    const location = document.getElementById('locationInput').value.trim();
    if (!location) {
        alert("Please enter a location.");
        return;
    }
    

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    fetchWeatherData(url);
}

async function fetchWeatherData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            if (response.status === 404) {
                alert("City not found. Please check the spelling or add a country code (e.g., 'London, UK').");
            } else {
                throw new Error("Error fetching weather data.");
            }
        } else {
            const data = await response.json();
            displayWeatherData(data);
        }
    } catch (error) {
        alert("Failed to fetch data: " + error.message);
    }
}

function displayWeatherData(data) {
    const weatherData = document.getElementById('weatherData');
    const { main, weather, wind, name } = data;
    weatherData.innerHTML = `
        <h2>Weather in ${name}</h2>
        <p>${weather[0].description}</p>
        <p>Temperature: ${main.temp} °C</p>
        <p>Feels like: ${main.feels_like} °C</p>
        <p>Humidity: ${main.humidity}%</p>
        <p>Wind Speed: ${wind.speed} m/s</p>
    `;
}
