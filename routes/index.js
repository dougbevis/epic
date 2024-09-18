const express = require('express');
const router = express.Router();

// Define the route for the home page
router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;