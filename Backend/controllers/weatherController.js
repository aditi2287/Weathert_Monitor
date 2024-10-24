// const Weather = require('../models/Weather');

// // Daily Summary with Aggregates
// const getDailySummary = async (req, res) => {
//   const summaries = await Weather.aggregate([
//     {
//       $group: {
//         _id: { day: { $dayOfYear: "$timestamp" }, city: "$city" },
//         avgTemp: { $avg: "$temperature" },
//         maxTemp: { $max: "$temperature" },
//         minTemp: { $min: "$temperature" },
//         dominantWeather: { $first: "$weather_condition" }, // Simplified assumption
//       }
//     }
//   ]);

//   res.json(summaries);
// };

// module.exports = { getDailySummary };


const Weather = require('../models/Weather');

// Daily Summary with Aggregates
const getDailySummary = async (req, res) => {
  try {
    const summaries = await Weather.aggregate([
      {
        $group: {
          _id: { day: { $dayOfYear: "$timestamp" }, city: "$city" },
          avgTemp: { $avg: "$temperature" },
          maxTemp: { $max: "$temperature" },
          minTemp: { $min: "$temperature" },
          dominantWeather: { $first: "$weather_condition" }, // Simplified assumption
        }
      }
    ]);

    res.json(summaries);
  } catch (error) {
    console.error('Error fetching daily summary:', error);
    res.status(500).json({ error: 'Failed to fetch daily summary' });
  }
};

module.exports = { getDailySummary };
