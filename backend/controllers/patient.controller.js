
const Patient = require("../models/Patient");
const { v4: uuidv4 } = require("uuid");

exports.createPatient = async (req, res) => {
  const patient = new Patient({
    ...req.body,
    patientId: uuidv4()
  });
  await patient.save();
  res.status(201).json(patient);
};

exports.getPatientById = async (req, res) => {
  const patient = await Patient.findOne({ patientId: req.params.patientId });
  if (!patient) return res.status(404).json({ message: "Patient not found" });
  res.json(patient);
};
