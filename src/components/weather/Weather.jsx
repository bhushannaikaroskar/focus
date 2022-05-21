import axios from "axios";
import React, { useEffect, useState } from "react";
import "./weather.css";

export default function Weather() {
    const [coordinates, setCoordinates] = useState({ lat: 0, lon: 0 });
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);

    const weatherApi = () => {
        axios
            .get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
            )
            .then((res) => {
                setWeather({
                    temperature: (res.data.main.temp - 273.15).toFixed(0),
                    icon: res.data.weather[0].icon,
                    city: res.data.name
                });
            });
    };

    const getLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { longitude, latitude } = position.coords;
            setCoordinates({ lon: longitude, lat: latitude });
        });
    };

    useEffect(() => {
        getLocation();
    }, []);

    useEffect(() => {
        const timeout = setTimeout(()=>{
            weatherApi();
        },100);
        return ()=> clearTimeout(timeout)
    }, [coordinates]);

    return (
        <div className="weather-container">
            {weather !== null && <div className="weather-icon">
                <img
                    src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                    alt="weather-icon"
                />
            </div>}
            {weather !== null && <div className="weather-content">
                <div className="weather-temperature">{weather.temperature}°C</div>
                <div className="city-name">{weather.city}</div>
            </div>}
        </div>
    );
}
