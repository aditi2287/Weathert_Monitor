// const mongoose = require('mongoose');

// const WeatherSchema = new mongoose.Schema({
//   city: String,
//   temperature: Number,     // Temp in Celsius
//   feels_like: Number,      // Feels like in Celsius
//   weather_condition: String,
//   timestamp: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Weather', WeatherSchema);




const mongoose = require('mongoose');

const WeatherSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
    trim: true,               // Removes leading/trailing spaces
    lowercase: true           // Converts city name to lowercase for consistency
  },
  temperature: {
    type: Number,
    required: true,
    min: -100,                // Set a reasonable minimum temperature (in Celsius)
    max: 100                  // Set a reasonable maximum temperature (in Celsius)
  },
  feels_like: {
    type: Number,
    required: true,
    min: -100,
    max: 100
  },
  weather_condition: {
    type: String,
    required: true,
    trim: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Add an index for efficient querying based on city and timestamp
WeatherSchema.index({ city: 1, timestamp: 1 });

module.exports = mongoose.model('Weather', WeatherSchema);
