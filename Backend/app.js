// const express = require('express');
// const mongoose = require('mongoose');
// const fetchWeatherData = require('./services/weatherService');
// const checkForAlerts = require('./alerts/alertService');
// const weatherRoutes = require('./routes/weatherRoutes');

// require('dotenv').config();

// const app = express();
// app.use('/weather', weatherRoutes);

// const PORT = process.env.PORT || 5000;

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log('MongoDB connected'))
//   .catch((err) => console.log(err));

// // Fetch Weather Data every 5 minutes
// setInterval(fetchWeatherData, 5 * 60 * 1000);

// // Check for alerts every 5 minutes
// setInterval(checkForAlerts, 5 * 60 * 1000);

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// const express = require('express');
// const mongoose = require('mongoose');
// const fetchWeatherData = require('./services/weatherService');
// const checkForAlerts = require('./alerts/alertService');
// const weatherRoutes = require('./routes/weatherRoutes');

// require('dotenv').config();

// const app = express();

// // Middleware to parse JSON data
// app.use(express.json());

// // Mount the weather routes on '/api/weather'
// app.use('/api/weather', weatherRoutes);

// const PORT = process.env.PORT || 5000;

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('MongoDB connected'))
// .catch((err) => console.log('MongoDB connection error:', err));

// // Fetch Weather Data every 5 minutes
// setInterval(fetchWeatherData, 5 * 60 * 1000);

// // Check for alerts every 5 minutes
// setInterval(checkForAlerts, 5 * 60 * 1000);

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




// const express = require('express');
// const mongoose = require('mongoose');
// const fetchWeatherData = require('./services/weatherService').fetchWeatherData;
// const checkForAlerts = require('./alerts/alertService').checkForAlerts;
// const weatherRoutes = require('./routes/weatherRoutes');

// require('dotenv').config();

// const app = express();

// // Middleware to parse JSON data
// app.use(express.json());

// // Mount the weather routes on '/api'
// app.use('/api', weatherRoutes);

// const PORT = process.env.PORT || 5000;

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('MongoDB connected'))
// .catch((err) => console.log('MongoDB connection error:', err));

// // Fetch Weather Data every 5 minutes
// setInterval(fetchWeatherData, 5 * 60 * 1000);

// // Check for alerts every 5 minutes
// setInterval(checkForAlerts, 5 * 60 * 1000);

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




const express = require('express');
const mongoose = require('mongoose');
const { fetchWeatherData } = require('./services/weatherService'); // Destructure the function

const { checkForAlerts } = require('./alerts/alertService'); // Destructure the function
const weatherRoutes = require('./routes/weatherRoutes');
require('dotenv').config(); // Load environment variables from .env file
const cors = require('cors');

const app = express();

// Middleware to parse JSON data
app.use(express.json());
app.use(cors());

// Mount the weather routes on '/api'
app.use('/api', weatherRoutes);

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('MongoDB connection error:', err));

// Fetch Weather Data every 5 minutes
setInterval(() => {
  fetchWeatherData().catch(err => console.error('Error fetching weather data:', err));
}, 5 * 60 * 1000);

// Check for alerts every 5 minutes
setInterval(() => {
  checkForAlerts().catch(err => console.error('Error checking for alerts:', err));
}, 5 * 60 * 1000);

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
