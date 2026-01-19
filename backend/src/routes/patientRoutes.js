import express from 'express';
import { registerPatient, getPatient, validateQR } from '../controllers/patientController.js';
// import { protect } from '../middleware/authMiddleware.js'; // Will add protection later

const router = express.Router();

router.post('/', registerPatient);
router.get('/:id', getPatient);
router.post('/validate-qr', validateQR);

export default router;
