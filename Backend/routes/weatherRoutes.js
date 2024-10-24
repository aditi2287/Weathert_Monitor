// const express = require('express');
// const { getDailySummary } = require('../controllers/weatherController');
// const router = express.Router();

// router.get('/daily-summary', getDailySummary);

// module.exports = router;




// routes/weatherRoutes.js
// const express = require('express');
// const router = express.Router();
// const weatherService = require('../services/weatherService'); // Import the weather service

// // Route to handle GET requests to '/api/weather'
// router.get('/', async (req, res) => {
//     try {
//         const weatherData = await weatherService.getWeatherData(); // Fetch weather data from the service
//         res.json(weatherData); // Send the weather data as the response
//     } catch (error) {
//         console.error('Error fetching weather data:', error);
//         res.status(500).json({ error: 'Failed to retrieve weather data' });
//     }
// });

// module.exports = router;



// routes/weatherRoutes.js
// const express = require('express');
// const router = express.Router();
// const weatherService = require('../services/weatherService'); // Your weather service

// const summaryService = require('../services/weatherService');

// // Route to get all weather data
// router.get('/weather', async (req, res) => {
//     try {
//         const weatherData = await weatherService.getWeatherData(); // Fetch all weather data
//         res.json(weatherData);
//     } catch (error) {
//         console.error('Error fetching weather data:', error);
//         res.status(500).json({ error: 'Failed to retrieve weather data' });
//     }
// });

// // Route to get daily summaries
// router.get('/summaries', async (req, res) => {
//     try {
//         const summaries = await summaryService.getDailySummaries(); // Fetch daily summaries (replace with your logic)
//         res.json(summaries);
//     } catch (error) {
//         console.error('Error fetching daily summaries:', error);
//         res.status(500).json({ error: 'Failed to retrieve daily summaries' });
//     }
// });

// module.exports = router;




// const express = require('express');
// const router = express.Router();
// const weatherService = require('../services/weatherService'); // Import weather service

// // Route to get all weather data
// router.get('/weather', async (req, res) => {
//     try {
//         const weatherData = await weatherService.getWeatherData(); // Fetch all weather data
//         res.json(weatherData);
//     } catch (error) {
//         console.error('Error fetching weather data:', error);
//         res.status(500).json({ error: 'Failed to retrieve weather data' });
//     }
// });

// // Route to get daily summaries
// router.get('/summaries', async (req, res) => {
//     try {
//         const summaries = await weatherService.getDailySummaries(); // Fetch daily summaries
//         res.json(summaries);
//     } catch (error) {
//         console.error('Error fetching daily summaries:', error);
//         res.status(500).json({ error: 'Failed to retrieve daily summaries' });
//     }
// });

// module.exports = router;


// const express = require('express');
// const router = express.Router();
// const weatherService = require('../services/weatherService'); // Import your weather service

// // Route to get all weather data
// router.get('/weather', async (req, res) => {
//     const { city, state, country } = req.query;
//     try {
//         const weatherData = await weatherService.getWeatherData({ city, state, country }); // Fetch all weather data
//         res.json(weatherData);
//     } catch (error) {
//         console.error('Error fetching weather data:', error);
//         res.status(500).json({ error: 'Failed to retrieve weather data' });
//     }
// });

// // Route to get daily summaries
// router.get('/summaries', async (req, res) => {
//     try {
//         const summaries = await weatherService.getDailySummaries(); // Ensure this function is correctly defined
//         res.json(summaries);
//     } catch (error) {
//         console.error('Error fetching daily summaries:', error);
//         res.status(500).json({ error: 'Failed to retrieve daily summaries' });
//     }
// });

// module.exports = router; // Export the router


const express = require('express');
const router = express.Router();
const weatherService = require('../services/weatherService'); // Import your weather service

// Route to get all weather data
router.get('/weather', async (req, res) => {
    const { city } = req.query;
    console.log('Received request for weather data:', { city });
    try {
        const weatherData = await weatherService.getWeatherData({ city });
        console.log('Weather data retrieved:', weatherData);
        res.json(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Failed to retrieve weather data' });
    }
});

// Route to get daily summaries
router.get('/summaries', async (req, res) => {
    console.log('Received request for daily summaries');
    try {
        const summaries = await weatherService.getDailySummaries();
        console.log('Daily summaries retrieved:', summaries);
        res.json(summaries);
    } catch (error) {
        console.error('Error fetching daily summaries:', error);
        res.status(500).json({ error: 'Failed to retrieve daily summaries' });
    }
});

module.exports = router;
