import asyncHandler from 'express-async-handler';
import Patient from '../models/Patient.js';

// @desc    Register a new patient
// @route   POST /api/patients
// @access  Private (Staff/Doctor)
const registerPatient = asyncHandler(async (req, res) => {
    const { name, age, gender, contact, address, medicalHistory } = req.body;

    // Generate a simple unique ID
    const uniqueId = 'PAT-' + Date.now().toString().slice(-6) + Math.floor(Math.random() * 1000);

    // QR Data could be the uniqueId itself or a signed token containing the ID
    // For simplicity, we use the uniqueId as the QR payload
    const qrData = uniqueId;

    const patient = await Patient.create({
        name,
        age,
        gender,
        contact,
        address,
        medicalHistory,
        uniqueId,
        qrData
    });

    if (patient) {
        res.status(201).json(patient);
    } else {
        res.status(400);
        throw new Error('Invalid patient data');
    }
});

// @desc    Get patient by ID (QR Scan)
// @route   GET /api/patients/:id
// @access  Private (Doctor/Staff)
const getPatient = asyncHandler(async (req, res) => {
    const patient = await Patient.findOne({ uniqueId: req.params.id });

    if (patient) {
        res.json(patient);
    } else {
        res.status(404);
        throw new Error('Patient not found');
    }
});

// @desc    Validate QR Code
// @route   POST /api/patients/validate-qr
// @access  Private
const validateQR = asyncHandler(async (req, res) => {
    const { qrData } = req.body; // Expecting the scanned string

    // In our simple case, qrData IS the uniqueId
    const patient = await Patient.findOne({ uniqueId: qrData });

    if (patient) {
        res.json({ valid: true, patient });
    } else {
        res.status(404).json({ valid: false, message: 'Invalid QR Code' });
    }
});

export { registerPatient, getPatient, validateQR };
