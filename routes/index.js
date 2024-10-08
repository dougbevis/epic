const express = require('express');
const router = express.Router();
const scrapeSchedule = require('../scrapeSchedule');

// Define the route for the home page
router.get('/', async (req, res) => {
    try {
        console.log('Calling scrapeSchedule function...');
        const schedule = await scrapeSchedule();
        console.log('Schedule fetched:', schedule);
        res.render('index', { schedule }); // Pass the schedule to the view
    } catch (error) {
        console.error('Error fetching schedule:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;