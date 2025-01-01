import React, { useEffect, useState } from 'react';

const App = () => {
  const [city, setCity] = useState('');
  const [result, setResult] = useState({}); // Initialize as an empty object

  const handleSearch = () => {
    if (city.trim()) {
      fetchWeather(city); // Call fetchWeather with the city input value
      setCity(''); // Clear the input field after the search
    } else {
      setResult({ error: 'Please enter a city name' });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const fetchWeather = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      // console.log(data);

      setResult({
        humidity: data.main.humidity,
        windspeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
      });
    } catch (error) {
      console.log(error);
      setResult({ error: 'Unable to fetch weather data. Please try again.' });
      alert('Enter a valid city name');
    }
  };

  useEffect(() => {
    fetchWeather('New York'); // Fetch the default city weather on initial load
  }, []);

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="w-80 bg-lime-600 p-6 rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-medium text-white py-3">Weather App</h1>
          <div className="flex items-center justify-center gap-2">
            <label htmlFor="cityInput" className="sr-only">City Name</label>
            <input
              id="cityInput"
              className="w-64 p-2 rounded-lg border border-gray-300"
              type="text"
              value={city}
              onKeyDown={handleKeyDown}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name"
            />
            <button
              className="text-2xl"
              onClick={handleSearch}
              aria-label="Search"
            >
              🔍
            </button>
          </div>
        </div>

        {/* Display Weather Data or Error */}
        <div className="flex flex-col items-center justify-center">
          {result.error ? (
            <p className="text-red-500 text-center mt-4">{result.error}</p>
          ) : (
            <>
              <h1 className="text-white text-center text-5xl font-medium mt-4">
                {result.temperature ? `${result.temperature}°C` : '--'}
              </h1>
              <p className="text-white text-center text-3xl">
                {result.location || ''}
              </p>
            </>
          )}
        </div>

        {/* Display Humidity and Wind Speed if data is available */}
        {!result.error && result.temperature && (
          <div className="flex items-center justify-between">
            <div className="text-white text-center mt-4">
              <h3 className="text-lg">{result.humidity || '--'} %</h3>
              <h3 className="text-base">Humidity</h3>
            </div>
            <div className="text-white text-center mt-4">
              <h3 className="text-lg">{result.windspeed || '--'} km/h</h3>
              <h3 className="text-base">Wind Speed</h3>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default App;
