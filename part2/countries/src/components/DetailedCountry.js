import { useState, useEffect } from "react";
import weatherService from "../services/weather";

const DetailedCountry = ({country}) => {
    const [weatherData, setWeatherData] = useState(null);

    const hook = () => {
        const lat_lon = country.capitalInfo.latlng;
        weatherService.getWeather(lat_lon[0], lat_lon[1])
            .then(data => {
                setWeatherData(data);
            });
    }

    useEffect(hook, []);

    return (weatherData ?
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital}</p>
            <p>Area: {country.area}</p>

            <h3>Languages:</h3>
            <ul>
                {Object.values(country.languages).map(value => <li key={value}>{value}</li>)}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt}></img>

            <h1>Weather in {country.name.common}</h1>
            <p>Temperature: {(weatherData.main.temp - 273.15).toFixed(2)} Celsius</p>
            <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}></img>
            <p>Wind: {weatherData.wind.speed} m/s</p>
        </div>
        :
        <div>
            <p>Loading...</p>
        </div>
    );
}

export default DetailedCountry;