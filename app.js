require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const indexRouter = require('./routes/index');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public/views'));

// Serve static files from the "assets" directory
app.use(express.static(path.join(__dirname, 'public')));

// Use the index router for the root path
app.use('/', indexRouter);

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send-email', (req, res) => {
  const { name, email, comment } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS   // Your email password
    }
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER, // Recipient email
    subject: `Contact form submission from ${name}`,
    text: comment
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send('Error sending email: ' + error.message);
    }
    res.status(200).send('Email sent: ' + info.response);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});