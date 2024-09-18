const express = require('express');
const router = express.Router();
const scrapeSchedule = require('./scrapeSchedule');

// Define the route for the home page
app.get('/', async (req, res) => {
    const schedule = await scrapeSchedule();
    res.render('index', { schedule });
  });

module.exports = router;