// app.js - Main server file
const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse request bodies
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded


// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.render('index', { 
    title: 'Adebayo Jamiu | Software Developer',
    page: 'home' 
  });
});

app.get('/about', (req, res) => {
  res.render('about', { 
    title: 'About Me | Adebayo Jamiu',
    page: 'about' 
  });
});

app.get('/projects', (req, res) => {
  res.render('projects', { 
    title: 'Projects | Adebayo Jamiu',
    page: 'projects' 
  });
});

app.get('/skills', (req, res) => {
  res.render('skills', { 
    title: 'Skills | Adebayo Jamiu',
    page: 'skills' 
  });
});

app.get('/contact', (req, res) => {
  res.render('contact', { 
    title: 'Contact | Adebayo Jamiu',
    page: 'contact' 
  });
});


// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      
      // Validate required fields
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ 
          success: false, 
          message: 'Please fill all required fields' 
        });
      }
      
      // Configure email transporter
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
      
      // Email content
      const mailOptions = {
        from: email,
        to: process.env.RECIPIENT_EMAIL, 
        subject: `Contact Form Submission from ${name}`,
        html: `
          <h2>Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject || 'Not provided'}</p>
          
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `
      };
      
      // Send email
      await transporter.sendMail(mailOptions);
      
      // Return success response
      res.status(200).json({ 
        success: true, 
        message: 'Message sent successfully' 
      });
      
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Server error, could not send message' 
      });
    }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
