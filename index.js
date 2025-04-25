


// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// List of 10 cities
const cities = [
  'Patna',
  'Varanashi',
  'Allahabad',
  'Kanpur',
  'Munger',
  'Bhagalpur',
  'Ghazipur',
  'Kolkata',
];

// Function to generate random pH between 4 and 8 with 2 decimal places
const generateRandomPh = () => {
  const min = 6;
  const max = 8;
  const randomPh = min + Math.random() * (max - min);
  return Number(randomPh.toFixed(2));
};

// Function to generate pH data for all cities
const generatePhData = () => {
  return cities.map(city => ({
    city: city,
    phLevel: generateRandomPh(),
    timestamp: new Date().toISOString()
  }));
};

// Store initial pH data
let currentPhData = generatePhData();

// Update pH data every 1 minute (60,000 milliseconds)
setInterval(() => {
  currentPhData = generatePhData();
  console.log('pH data updated at', new Date().toISOString());
}, 60_000);

// Enable CORS for all origins (or specify 'http://127.0.0.1:5500' for production)
app.use(cors({
  origin: '*' // Allows all origins; for production, use ['http://127.0.0.1:5500']
}));

// API endpoint to get pH levels
app.get('/api/ph-levels', (req, res) => {
  res.json({
    status: 'success',
    data: currentPhData
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});