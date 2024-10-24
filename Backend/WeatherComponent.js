// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const WeatherComponent = () => {
//     // State to store weather data
//     const [weatherData, setWeatherData] = useState([]);
//     const [error, setError] = useState(null);

//     // Fetch weather data from the backend
//     const fetchWeatherData = async () => {
//         try {
//             const response = await axios.get('/api/weather'); // Make sure this matches your backend endpoint
//             console.log(response.data); // Log the data structure to confirm it's coming in as expected
//             setWeatherData(response.data); // Set the weather data to state
//         } catch (error) {
//             console.error('Error fetching weather data:', error);
//             setError('Failed to fetch weather data');
//         }
//     };

//     // useEffect to run the fetch function when the component loads
//     useEffect(() => {
//         fetchWeatherData();
//     }, []); // Empty dependency array means this will only run once when the component loads

//     // Display a loading message while waiting for data
//     if (!weatherData.length && !error) {
//         return <div>Loading weather data...</div>;
//     }

//     // Display error message if there's a failure
//     if (error) {
//         return <div>{error}</div>;
//     }

//     // Render the weather data
//     return (
//         <div>
//             <h2>Weather Data</h2>
//             <ul>
//                 {weatherData.map((data, index) => (
//                     <li key={index}>
//                         <p><strong>Date:</strong> {new Date(data.dt * 1000).toLocaleDateString()}</p>
//                         <p><strong>Main Condition:</strong> {data.main}</p>
//                         <p><strong>Temperature:</strong> {data.temp}°C</p>
//                         <p><strong>Feels Like:</strong> {data.feels_like}°C</p>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default WeatherComponent;





// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const WeatherComponent = () => {
//     // State to store weather data and error message
//     const [weatherData, setWeatherData] = useState([]);
//     const [error, setError] = useState(null);
//     const [query, setQuery] = useState("");

//     // Fetch weather data from the backend based on the query
//     const fetchWeatherData = async (query) => {
//         try {
//             // If no query, return early
//             if (!query) return;

//             const response = await axios.get(`/api/weather?${query}`); // Ensure this matches your backend endpoint
//             console.log(response.data); // Log the data structure to confirm it's coming in as expected
//             setWeatherData(response.data); // Set the weather data to state
//         } catch (error) {
//             console.error('Error fetching weather data:', error);
//             setError('Failed to fetch weather data');
//         }
//     };

//     const handleSearch = (e) => {
//         e.preventDefault();
//         fetchWeatherData(`query=${query}`); // Use this format to send the query
//     };

//     // useEffect to run the fetch function when the component loads
//     useEffect(() => {
//         fetchWeatherData(""); // Call with empty query initially, you can remove if not needed
//     }, []); // Empty dependency array means this will only run once when the component loads

//     // Display a loading message while waiting for data
//     if (!weatherData.length && !error) {
//         return <div>Loading weather data...</div>;
//     }

//     // Display error message if there's a failure
//     if (error) {
//         return <div>{error}</div>;
//     }

//     // Render the weather data
//     return (
//         <div>
//             <h2>Weather Search</h2>
//             <form onSubmit={handleSearch}>
//                 <input 
//                     type="text" 
//                     placeholder="Enter city, state, or country" 
//                     value={query}
//                     onChange={(e) => setQuery(e.target.value)} // Update query state on input change
//                 />
//                 <button type="submit">Search</button>
//             </form>

//             <h2>Weather Data</h2>
//             {weatherData.length > 0 ? (
//                 <ul>
//                     {weatherData.map((data, index) => (
//                         <li key={index}>
//                             <p><strong>Date:</strong> {new Date(data.timestamp).toLocaleDateString()}</p>
//                             <p><strong>Main Condition:</strong> {data.weather_condition}</p>
//                             <p><strong>Temperature:</strong> {data.temperature}°C</p>
//                             <p><strong>Feels Like:</strong> {data.feels_like}°C</p>
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <div>No weather data available</div>
//             )}
//         </div>
//     );
// };

// export default WeatherComponent;



// import React, { useState } from 'react';
// import axios from 'axios';

// const WeatherComponent = () => {
//     const [weatherData, setWeatherData] = useState([]);
//     const [error, setError] = useState(null);
//     const [query, setQuery] = useState("");

//     // Fetch weather data from the backend
//     const fetchWeatherData = async () => {
//         if (!query) return; // Don't fetch if there's no query
//         try {
//             const response = await axios.get(`/api/weather?city=${query}`); // Ensure this matches your backend endpoint
//             console.log(response.data); // Log the data structure to confirm it's coming in as expected
//             setWeatherData(response.data); // Set the weather data to state
//             setError(null); // Clear previous error
//         } catch (error) {
//             console.error('Error fetching weather data:', error);
//             setError('Failed to fetch weather data');
//             setWeatherData([]); // Clear previous data on error
//         }
//     };

//     const handleSearch = (e) => {
//         e.preventDefault();
//         fetchWeatherData();
//     };

//     return (
//         <div>
//             <h2>Weather Data</h2>
//             <form onSubmit={handleSearch}>
//                 <input
//                     type="text"
//                     placeholder="Enter city name"
//                     value={query}
//                     onChange={(e) => setQuery(e.target.value)}
//                 />
//                 <button type="submit">Search</button>
//             </form>

//             {/* Display a loading message while waiting for data */}
//             {weatherData.length === 0 && !error && <div>No data available. Please search for a city.</div>}

//             {/* Display error message if there's a failure */}
//             {error && <div>{error}</div>}

//             {/* Render the weather data */}
//             {weatherData.length > 0 && (
//                 <ul>
//                     {weatherData.map((data, index) => (
//                         <li key={index}>
//                             <p><strong>Date:</strong> {new Date(data.timestamp).toLocaleDateString()}</p>
//                             <p><strong>Main Condition:</strong> {data.weather_condition}</p>
//                             <p><strong>Temperature:</strong> {data.temperature}°C</p>
//                             <p><strong>Feels Like:</strong> {data.feels_like}°C</p>
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// };

// export default WeatherComponent;



import React, { useState } from 'react';
import axios from 'axios';

const WeatherComponent = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [error, setError] = useState(null);
    const [query, setQuery] = useState("");

    // Fetch weather data from the backend
    const fetchWeatherData = async () => {
        if (!query) return; // Don't fetch if there's no query
        try {
            const response = await axios.get(`/api/weather?city=${encodeURIComponent(query)}`); // Ensure this matches your backend endpoint
            console.log(response.data); // Log the data structure to confirm it's coming in as expected
            setWeatherData(response.data); // Assuming response.data is an array of weather data
            setError(null); // Clear previous error
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setError('Failed to fetch weather data');
            setWeatherData([]); // Clear previous data on error
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchWeatherData();
    };

    return (
        <div>
            <h2>Weather Data</h2>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Enter city name"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            {/* Display a loading message while waiting for data */}
            {weatherData.length === 0 && !error && <div>No data available. Please search for a city.</div>}

            {/* Display error message if there's a failure */}
            {error && <div>{error}</div>}

            {/* Render the weather data */}
            {weatherData.length > 0 && (
                <ul>
                    {weatherData.map((data, index) => (
                        <li key={index}>
                            <p><strong>Date:</strong> {new Date(data.timestamp).toLocaleDateString()}</p>
                            <p><strong>Main Condition:</strong> {data.weather_condition}</p>
                            <p><strong>Temperature:</strong> {data.temperature}°C</p>
                            <p><strong>Feels Like:</strong> {data.feels_like}°C</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default WeatherComponent;
