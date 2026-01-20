import express from 'express';
import { registerPatient, getPatient, getPatients, validateQR } from '../controllers/patientController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, admin, getPatients);
router.post('/', protect, admin, registerPatient);
router.get('/:id', getPatient);
router.post('/validate-qr', validateQR);

export default router;
