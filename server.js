const express = require('express');
const mongoose = require('mongoose');
const Patient = require('./models/patient');  // Import Patient model
const Doctor = require('./models/doctor');    // Import Doctor model

const app = express();
app.use(express.json());  // To parse JSON bodies in requests

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/hospital', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Route to add a new patient
app.post('/add-patient', (req, res) => {
  const newPatient = new Patient(req.body);  // Create new patient from request body
  newPatient.save()
    .then(() => {
      res.json({ message: 'Patient added successfully' });  // Respond with success message
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error adding patient', error });  // Handle errors
    });
});

// Route to add a new doctor
app.post('/add-doctor', (req, res) => {
  const newDoctor = new Doctor(req.body);  // Create new doctor from request body
  newDoctor.save()
    .then(() => {
      res.json({ message: 'Doctor added successfully' });  // Respond with success message
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error adding doctor', error });  // Handle errors
    });
});

// Serve static files from the "public" folder
app.use(express.static('public'));

// Route to serve the Add Patient page (Frontend)
app.get('/add-patient-page', (req, res) => {
  res.sendFile(__dirname + '/views/addPatient.html');
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
