const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://TrendyBrewSys:UfAGLEfLrRT01CMZ@trendycluster1.9ohrmbf.mongodb.net/MainReservationDb', { useNewUrlParser: true, useUnifiedTopology: true });

// Add cors middleware
app.use(cors());

// Create Reservation schema
const reservationSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  date: String,
  time: String,
  tableNumber: String,
  numberOfGuest: String,
  details: String,
  status: String,
});

const Reservation = mongoose.model('Reservation', reservationSchema);

app.use(bodyParser.json());

// Handle POST request for form submission
// Handle POST request for form submission
app.post('/submitReservation', async (req, res) => {
  const { name, email, phone, date, time, tableNumber, numberOfGuest, details } = req.body;
  const status = ""

  try {
    // Check total daily reservations for the specified table
    const existingReservations = await Reservation.find({ tableNumber, date });
    const maxReservationsPerDay = 3;

    if (existingReservations.length >= maxReservationsPerDay) {
      return res.status(400).json({ error: 'Table is fully booked for today' });
    }

    // Check availability for the specified time slot
    const reservationsForTimeSlot = existingReservations.filter(reservation => reservation.time === time);

    if (reservationsForTimeSlot.length >= 1) {
      return res.status(400).json({ error: 'Table is already booked for this time slot' });
      
    }

    // Create a new reservation document
    const newReservation = new Reservation({ name, email, phone, date, time, tableNumber, numberOfGuest, details, status });

    // Save the reservation to the database using await
    await newReservation.save();

    console.log('Reservation saved successfully');
    res.json({ message: 'Reservation submitted successfully' });
  } catch (err) {
    console.error('Error saving reservation:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
