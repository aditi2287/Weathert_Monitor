// const Weather = require('../models/Weather');
// const nodemailer = require('nodemailer');

// const checkForAlerts = async () => {
//   const threshold = 35; // Example threshold for temperature

//   // Check if the latest temperature exceeds threshold
//   const recentWeather = await Weather.find().sort({ timestamp: -1 }).limit(2);
//   const [latest, previous] = recentWeather;

//   if (latest.temperature > threshold && previous.temperature > threshold) {
//     // Trigger alert (e.g., send email)
//     sendAlertEmail(latest);
//   }
// };

// // Sample Email Alert function using nodemailer
// const sendAlertEmail = async (weather) => {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'your-email@gmail.com',
//       pass: 'your-email-password'
//     }
//   });

//   const mailOptions = {
//     from: 'your-email@gmail.com',
//     to: 'user@example.com',
//     subject: `Weather Alert for ${weather.city}`,
//     text: `Temperature exceeded threshold! Current temperature: ${weather.temperature}°C`
//   };

//   await transporter.sendMail(mailOptions);
// };

// module.exports = {checkForAlerts};




const Weather = require('../models/Weather');
const nodemailer = require('nodemailer');

// Check for temperature alerts based on threshold
const checkForAlerts = async () => {
  try {
    const threshold = 35; // Temperature threshold

    // Fetch the two most recent weather entries
    const recentWeather = await Weather.find().sort({ timestamp: -1 }).limit(2);
    if (recentWeather.length < 2) {
      console.log('Not enough data to check for alerts');
      return; // Not enough data points to compare
    }

    const [latest, previous] = recentWeather;

    // If both latest and previous temperatures exceed threshold, trigger alert
    if (latest.temperature > threshold && previous.temperature > threshold) {
      console.log('Threshold exceeded, sending alert...');
      await sendAlertEmail(latest);
    }
  } catch (error) {
    console.error('Error checking for alerts:', error);
  }
};

// Send an email alert using nodemailer
const sendAlertEmail = async (weather) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Use environment variables for email
        pass: process.env.EMAIL_PASS  // Password from environment variable
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,  // Email address sending the alert
      to: 'user@example.com',        // Recipient's email address
      subject: `Weather Alert for ${weather.city}`,  // Email subject
      text: `Temperature exceeded the threshold! Current temperature in ${weather.city}: ${weather.temperature}°C`
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Alert email sent successfully');
  } catch (error) {
    console.error('Error sending alert email:', error);
  }
};

module.exports = { checkForAlerts };
