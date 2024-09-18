const express = require('express');
const router = express.Router();
const scrapeSchedule = require('./scrapeSchedule');

// Define the route for the home page
router.get('/', async (req, res) => {
    const schedule = await scrapeSchedule();
    res.render('index', { scrapeSchedule });
  });

module.exports = router;