// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function App() {
//   const [dailySummaries, setDailySummaries] = useState([]);

//   useEffect(() => {
//     const fetchSummaries = async () => {
//       const res = await axios.get('/weather/daily-summary');
//       setDailySummaries(res.data);
//     };

//     fetchSummaries();
//   }, []);

//   return (
//     <div className="App">
//       <h1>Weather Daily Summaries</h1>
//       {dailySummaries.map((summary, index) => (
//         <div key={index}>
//           <h3>{summary._id.city}</h3>
//           <p>Avg Temp: {summary.avgTemp.toFixed(2)}°C</p>
//           <p>Max Temp: {summary.maxTemp.toFixed(2)}°C</p>
//           <p>Min Temp: {summary.minTemp.toFixed(2)}°C</p>
//           <p>Dominant Weather: {summary.dominantWeather}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default App;





import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [dailySummaries, setDailySummaries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading

  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/summaries'); // Ensure this matches your backend endpoint
        setDailySummaries(res.data);
      } catch (err) {
        console.error('Error fetching daily summaries:', err);
        setError('Failed to fetch daily summaries'); // Set error message
      } finally {
        setLoading(false); // Set loading to false after fetch
      }
    };

    fetchSummaries();
  }, []);

  // Display loading message while fetching data
  if (loading) {
    return <div>Loading daily summaries...</div>;
  }

  // Display error message if there's a failure
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="App">
      <h1>Weather Daily Summaries</h1>
      {dailySummaries.length > 0 ? (
        dailySummaries.map((summary, index) => (
          <div key={index}>
            <h3>{summary._id.city}</h3>
            <p>Avg Temp: {summary.avgTemp.toFixed(2)}°C</p>
            <p>Max Temp: {summary.maxTemp.toFixed(2)}°C</p>
            <p>Min Temp: {summary.minTemp.toFixed(2)}°C</p>
            <p>Dominant Weather: {summary.dominantWeather}</p>
          </div>
        ))
      ) : (
        <p>No summaries available.</p> // Message when no summaries exist
      )}
    </div>
  );
}

export default App;
