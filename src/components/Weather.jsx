import React, { useEffect, useState } from 'react';

export const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [location, setLocation] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [inputLocation, setInputLocation] = useState('');

    const fetchWeatherByCity = async (city) => {
        const apiKey = '95add9e4d88004fa46ffc1844034cb2f'; 
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
        );
        const data = await response.json();
        console.log(data);
        if (data.cod === 200) {
            setWeatherData(data);
            setLocation(data.name);
        } else {
            alert('City not found');
        }
    };

    // Fetch weather data by user's location
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchWeatherByCoords(latitude, longitude);
            },
            () => {
                fetchWeatherByCity('Kathmandu'); // Default city
            }
        );
    }, []);

// Fetch weather data by coordinates
    const fetchWeatherByCoords = async (lat, lon) => {
        const apiKey = '95add9e4d88004fa46ffc1844034cb2f'; //API key
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );
        const data = await response.json();
        setWeatherData(data);
        setLocation(data.name);
    };

    const handleLocationClick = () => {
        setIsEditing(true);
        setInputLocation(location);
    };

    const handleInputChange = (e) => {
        setInputLocation(e.target.value);
    };

    const handleInputKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleInputBlur();
        }
    };

    const handleInputBlur = () => {
        if (inputLocation.trim() !== '') {
            fetchWeatherByCity(inputLocation.trim());
        }
        setIsEditing(false);
    };

    if (!weatherData) {
        return (
            <div className="flex justify-center items-center h-full text-white">
                <h1>Loading...</h1>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center text-white p-4">
            {isEditing ? (
                <input
                    type="text"
                    value={inputLocation}
                    onChange={handleInputChange}
                    onKeyDown={handleInputKeyDown}
                    onBlur={handleInputBlur}
                    autoFocus
                    className="bg-white/20 backdrop-blur-md shadow-lg rounded-full w-full py-1 px-4 text-xl font-bold text-center outline-none"
                />
            ) : (
                <span
                    className="bg-white/20 backdrop-blur-md shadow-lg rounded-full py-1 px-4 text-xl font-bold cursor-pointer"
                    onClick={handleLocationClick}
                >
                    {location}
                </span>
            )}

            <img
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt="Weather Icon"
                className="mx-auto"
            />
            <p className="text-base font-medium">
                {weatherData.weather[0].description.toUpperCase()}
            </p>
            <p className="text-xl font-bold mt-2">{weatherData.main.temp}°C</p>
            <div className="grid border-t-2 border-t-slate-100 pt-2 mt-2 grid-cols-2 gap-4 text-sm text-left">
                <div>
                    <span className="font-medium">Feels Like:</span>
                    <p>{weatherData.main.feels_like}°C</p>
                </div>
                <div>
                    <span className="font-medium">Humidity:</span>
                    <p>{weatherData.main.humidity}%</p>
                </div>
                <div>
                    <span className="font-medium">Wind Speed:</span>
                    <p>{weatherData.wind.speed} m/s</p>
                </div>
                <div>
                    <span className="font-medium">Pressure:</span>
                    <p>{weatherData.main.pressure} hPa</p>
                </div>
            </div>
        </div>
    );
};