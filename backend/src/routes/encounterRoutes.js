import express from 'express';
import asyncHandler from 'express-async-handler';
import Encounter from '../models/Encounter.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Add new encounter
// @route   POST /api/encounters
// @access  Private
router.post('/', protect, asyncHandler(async (req, res) => {
    const { patient, type, data } = req.body;

    const encounter = await Encounter.create({
        patient,
        provider: req.user._id,
        type,
        data
    });

    if (encounter) {
        res.status(201).json(encounter);
    } else {
        res.status(400);
        throw new Error('Invalid encounter data');
    }
}));

// @desc    Get encouters for a patient
// @route   GET /api/encounters/patient/:id
// @access  Private
router.get('/patient/:id', protect, asyncHandler(async (req, res) => {
    const encounters = await Encounter.find({ patient: req.params.id }).populate('provider', 'name role');

    // Role-based filtering logic can be expanded here
    let filteredEncounters = encounters;

    if (req.user.role === 'staff') {
        filteredEncounters = encounters.filter(e => e.type === 'Demographics');
    } else if (req.user.role === 'nurse') {
        filteredEncounters = encounters.filter(e => ['Demographics', 'Vitals', 'Immunization'].includes(e.type));
    }
    // Doctors and Admins get all

    res.json(filteredEncounters);
}));

export default router;
