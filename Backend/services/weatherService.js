// const axios = require('axios');
// // const Weather = require('../models/Weather');
// const Weather = require("../models/Weather");



// const fetchWeatherData = async () => {
//   const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
//   const apiKey = process.env.OPENWEATHER_API_KEY;

//   for (const city of cities) {
//     const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`; // Fetch in Celsius
//     const response = await axios.get(url);

//     const { temp, feels_like } = response.data.main;
//     const weather_condition = response.data.weather[0].main;

//     const newWeather = new Weather({
//       city,
//       temperature: temp,
//       feels_like,
//       weather_condition,
//       timestamp: new Date(response.data.dt * 1000) // Convert Unix timestamp to Date
//     });

//     await newWeather.save();
//   }
// };

// module.exports = fetchWeatherData;




// services/weatherService.js
// const axios = require('axios');
// const Weather = require('../models/Weather'); // Import the Weather model

// // Function to fetch weather data from the database or external API
// const getWeatherData = async () => {
//     try {
//         // Fetch from database
//         const weatherData = await Weather.find(); // Adjust query as per your schema

//         // Fetch from API if no data found
//         if (!weatherData.length) {
//             const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
//             const apiKey = process.env.OPENWEATHERMAP_API_KEY; // Get the API key from .env

//             const fetchedData = [];
//             for (const city of cities) {
//                 const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
//                 const response = await axios.get(url);
//                 fetchedData.push({
//                     city: city,
//                     temp: response.data.main.temp,
//                     feels_like: response.data.main.feels_like,
//                     main: response.data.weather[0].main,
//                     dt: response.data.dt,
//                 });
//             }

//             // Save the fetched data to the database
//             await Weather.insertMany(fetchedData);

//             // Return the fetched data
//             return fetchedData;
//         }

//         return weatherData;
//     } catch (error) {
//         console.error('Error fetching weather data:', error);
//         throw new Error('Failed to fetch weather data');
//     }
// };

// module.exports = {
//     getWeatherData,
// };


// services/summaryService.js
// const Weather = require('../models/Weather'); // Assuming you have a Weather model
// const axios = require('axios');
// // Fetch daily weather summaries (logic based on your rollup/aggregate setup)
// const getDailySummaries = async () => {
//     try {
//         // Example aggregation logic (modify based on your schema and needs)
//         const summaries = await Weather.aggregate([
//             {
//                 $group: {
//                     _id: { day: { $dayOfMonth: "$dt" }, month: { $month: "$dt" }, year: { $year: "$dt" } },
//                     avgTemp: { $avg: "$temp" },
//                     maxTemp: { $max: "$temp" },
//                     minTemp: { $min: "$temp" },
//                     dominantCondition: { $first: "$main" } // Modify for your logic of dominant condition
//                 }
//             }
//         ]);

//         return summaries;
//     } catch (error) {
//         console.error('Error fetching daily summaries:', error);
//         throw new Error('Failed to fetch daily summaries');
//     }
// };

// module.exports = {
//     getDailySummaries,
// };



// const Weather = require('../models/Weather'); // Assuming you have a Weather model
// const axios = require('axios');

// // Fetch daily weather summaries
// const getDailySummaries = async () => {
//     try {
//         // Aggregation logic to calculate daily summaries
//         const summaries = await Weather.aggregate([
//             {
//                 $group: {
//                     _id: {
//                         day: { $dayOfMonth: "$dt" },
//                         month: { $month: "$dt" },
//                         year: { $year: "$dt" }
//                     },
//                     avgTemp: { $avg: "$temp" },
//                     maxTemp: { $max: "$temp" },
//                     minTemp: { $min: "$temp" },
//                     conditions: { $push: "$main" } // Collect all weather conditions
//                 }
//             },
//             {
//                 $addFields: {
//                     dominantCondition: {
//                         $arrayElemAt: [
//                             {
//                                 $first: {
//                                     $sortArray: {
//                                         input: {
//                                             $reduce: {
//                                                 input: "$conditions",
//                                                 initialValue: [],
//                                                 in: {
//                                                     $let: {
//                                                         vars: {
//                                                             existingCondition: {
//                                                                 $filter: {
//                                                                     input: "$$value",
//                                                                     as: "cond",
//                                                                     cond: { $eq: ["$$cond.condition", "$$this"] }
//                                                                 }
//                                                             }
//                                                         },
//                                                         in: {
//                                                             $cond: [
//                                                                 { $gt: [{ $size: "$$existingCondition" }, 0] },
//                                                                 {
//                                                                     $map: {
//                                                                         input: "$$value",
//                                                                         as: "cond",
//                                                                         in: {
//                                                                             condition: "$$cond.condition",
//                                                                             count: { $cond: [{ $eq: ["$$cond.condition", "$$this"] }, { $add: ["$$cond.count", 1] }, "$$cond.count"] }
//                                                                         }
//                                                                     }
//                                                                 },
//                                                                 { $concatArrays: ["$$value", [{ condition: "$$this", count: 1 }]] }
//                                                             ]
//                                                         }
//                                                     }
//                                                 }
//                                             }
//                                         },
//                                         sortBy: { count: -1 } // Sort by most frequent condition
//                                     }
//                                 }
//                             }
//                         ]
//                     }
//                 }
//             }
//         ]);

//         return summaries;
//     } catch (error) {
//         console.error('Error fetching daily summaries:', error);
//         throw new Error('Failed to fetch daily summaries');
//     }
// };

// module.exports = {
//     getDailySummaries,
// };


// const Weather = require('../models/Weather'); // Assuming you have a Weather model
// const axios = require('axios');

// // Fetch daily weather summaries
// const getDailySummaries = async () => {
//     try {
//         // Aggregation logic to calculate daily summaries
//         const summaries = await Weather.aggregate([
//             {
//                 $group: {
//                     _id: {
//                         day: { $dayOfMonth: "$timestamp" }, // Use timestamp from your schema
//                         month: { $month: "$timestamp" },
//                         year: { $year: "$timestamp" },
//                         city: "$city" // Optional: Include city if you want summaries per city
//                     },
//                     avgTemp: { $avg: "$temperature" },
//                     maxTemp: { $max: "$temperature" },
//                     minTemp: { $min: "$temperature" },
//                     conditions: { $push: "$weather_condition" } // Collect all weather conditions
//                 }
//             },
//             {
//                 $addFields: {
//                     dominantCondition: {
//                         $arrayElemAt: [
//                             {
//                                 $filter: {
//                                     input: {
//                                         $map: {
//                                             input: { $setUnion: "$conditions" }, // Get unique conditions
//                                             as: "condition",
//                                             in: {
//                                                 condition: "$$condition",
//                                                 count: {
//                                                     $size: {
//                                                         $filter: {
//                                                             input: "$conditions",
//                                                             as: "c",
//                                                             cond: { $eq: ["$$c", "$$condition"] }
//                                                         }
//                                                     }
//                                                 }
//                                             }
//                                         }
//                                     },
//                                     as: "item",
//                                     cond: { $gt: ["$$item.count", 0] } // Filter out conditions with a count of 0
//                                 }
//                             },
//                             0 // Get the first element (most frequent condition)
//                         ]
//                     }
//                 }
//             }
//         ]);

//         return summaries;
//     } catch (error) {
//         console.error('Error fetching daily summaries:', error);
//         throw new Error('Failed to fetch daily summaries');
//     }
// };

// module.exports = {
//     getDailySummaries,
// };



// const Weather = require('../models/Weather'); // Assuming you have a Weather model
// const axios = require('axios');

// // Fetch daily weather summaries
// const getDailySummaries = async () => {
//     try {
//         // Aggregation logic to calculate daily summaries
//         const summaries = await Weather.aggregate([
//             {
//                 $group: {
//                     _id: {
//                         day: { $dayOfMonth: "$timestamp" }, // Use timestamp from your schema
//                         month: { $month: "$timestamp" },
//                         year: { $year: "$timestamp" },
//                         city: "$city" // Optional: Include city if you want summaries per city
//                     },
//                     avgTemp: { $avg: "$temperature" },
//                     maxTemp: { $max: "$temperature" },
//                     minTemp: { $min: "$temperature" },
//                     conditions: { $push: "$weather_condition" } // Collect all weather conditions
//                 }
//             },
//             {
//                 $addFields: {
//                     dominantCondition: {
//                         $arrayElemAt: [
//                             {
//                                 $filter: {
//                                     input: {
//                                         $map: {
//                                             input: { $setUnion: "$conditions" }, // Get unique conditions
//                                             as: "condition",
//                                             in: {
//                                                 condition: "$$condition",
//                                                 count: {
//                                                     $size: {
//                                                         $filter: {
//                                                             input: "$conditions",
//                                                             as: "c",
//                                                             cond: { $eq: ["$$c", "$$condition"] }
//                                                         }
//                                                     }
//                                                 }
//                                             }
//                                         }
//                                     },
//                                     as: "item",
//                                     cond: { $gt: ["$$item.count", 0] } // Filter out conditions with a count of 0
//                                 }
//                             },
//                             0 // Get the first element (most frequent condition)
//                         ]
//                     }
//                 }
//             }
//         ]);

//         return summaries;
//     } catch (error) {
//         console.error('Error fetching daily summaries:', error);
//         throw new Error('Failed to fetch daily summaries');
//     }
// };

// module.exports = {
//  getDailySummaries,
    
// };


const Weather = require('../models/Weather'); // Assuming you have a Weather model
const axios = require('axios');

// Fetch current weather data from OpenWeather API based on city
const getWeatherData = async ({ city }) => {
    if (!city) throw new Error('City name is required');

    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=257d3320e65d705f9f391a4903b8d59b`);
        
        // Format the weather data according to your Weather model
        const weatherInfo = response.data;

        // Create a new weather data instance
        const weatherData = new Weather({
            city: weatherInfo.name,
            temperature: weatherInfo.main.temp,
            feels_like: weatherInfo.main.feels_like,
            weather_condition: weatherInfo.weather[0].description,
            timestamp: new Date(), // Save the current timestamp
        });

        // Save to database
        await weatherData.save();
        return weatherData; // Return the saved weather data
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw new Error('Failed to fetch weather data');
    }
};

// Fetch daily weather summaries from the database
const getDailySummaries = async () => {
    try {
        // Aggregation logic to calculate daily summaries
        const summaries = await Weather.aggregate([
            {
                $group: {
                    _id: {
                        day: { $dayOfMonth: "$timestamp" },
                        month: { $month: "$timestamp" },
                        year: { $year: "$timestamp" },
                        city: "$city" // Optional: Include city if you want summaries per city
                    },
                    avgTemp: { $avg: "$temperature" },
                    maxTemp: { $max: "$temperature" },
                    minTemp: { $min: "$temperature" },
                    conditions: { $push: "$weather_condition" } // Collect all weather conditions
                }
            },
            {
                $addFields: {
                    dominantCondition: {
                        $arrayElemAt: [
                            {
                                $filter: {
                                    input: {
                                        $map: {
                                            input: { $setUnion: "$conditions" }, // Get unique conditions
                                            as: "condition",
                                            in: {
                                                condition: "$$condition",
                                                count: {
                                                    $size: {
                                                        $filter: {
                                                            input: "$conditions",
                                                            as: "c",
                                                            cond: { $eq: ["$$c", "$$condition"] }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    },
                                    as: "item",
                                    cond: { $gt: ["$$item.count", 0] } // Filter out conditions with a count of 0
                                }
                            },
                            0 // Get the first element (most frequent condition)
                        ]
                    }
                }
            }
        ]);

        return summaries;
    } catch (error) {
        console.error('Error fetching daily summaries:', error);
        throw new Error('Failed to fetch daily summaries');
    }
};

module.exports = {
    getWeatherData,
    getDailySummaries,
};
