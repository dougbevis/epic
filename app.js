const express = require('express');
const path = require('path');
const app = express();
const indexRouter = require('./routes/index');

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "assets" directory
app.use(express.static(path.join(__dirname, 'assets')));

// Use the index router for the root path
app.use('/', indexRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});