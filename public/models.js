const mongoose = require('mongoose');

// Patient Schema
const patientSchema = new mongoose.Schema({
    name: String,
    age: Number,
    abhaId: String,
    aadhar: String,
    gender: String,
    bookingId: String,  // To store unique booking ID
    doctorId: String,   // Store the booked doctor's ID
});

// Doctor Schema
const doctorSchema = new mongoose.Schema({
    name: String,
    specialization: String,
    availableTime: String,  // Time slot in HH:MM format (e.g., "09:00-12:00")
});

const Patient = mongoose.model('Patient', patientSchema);
const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = { Patient, Doctor };
