const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  abhaId: String,
  aadharCard: String,
  gender: String,
});

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;
