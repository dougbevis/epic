const express = require('express');
const path = require('path');
const app = express();
const indexRouter = require('./routes/index');
const bodyParser = require('body-parser');

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public/views'));

// Serve static files from the "assets" directory
app.use(express.static(path.join(__dirname, 'public')));

// Use the index router for the root path
app.use('/', indexRouter);

app.use(bodyParser.urlencoded({ extended: true }));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});