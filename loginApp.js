// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://TrendyBrewSys:UfAGLEfLrRT01CMZ@trendycluster1.9ohrmbf.mongodb.net/WebsiteUserCredentials', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a schema for user data
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Handle POST requests for login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (user) {
      res.json({ success: true, message: 'Login successful!', redirectUrl: '/trendy-brew/index.html'  });
    } else {
      res.json({ success: false, message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// Handle POST requests for signup
app.post('/signup', async (req, res) => {
    try {
      const { signupEmail, signupPassword, confirmPassword } = req.body;
  
      // Check if the email already exists in the database
      const existingUser = await User.findOne({ email: signupEmail });
      if (existingUser) {
        res.json({ success: false, message: 'Email already exists, please use a different email' });
        return;
      }
  
      // Check if the passwords match
      if (signupPassword !== confirmPassword) {
        res.json({ success: false, message: 'Passwords do not match' });
        return;
      }
  
      // Create a new user using the User model
      const newUser = new User({ email: signupEmail, password: signupPassword });
  
      // Save the user to the database
      await newUser.save();
  
      res.json({ success: true, message: 'Signup successful!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });
  

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

