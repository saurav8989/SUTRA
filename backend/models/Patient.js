// import mongoose from "mongoose";
const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
  patientId: { type: String, unique: true },
  firstName: String,
  lastName: String,
  gender: String,
  dateOfBirth: Date,
  phoneNumber: String,
  address: String,
  registrationDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Patient", PatientSchema);
