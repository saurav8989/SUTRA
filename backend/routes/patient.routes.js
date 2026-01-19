const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const role = require("../middleware/role.middleware");
const {
  createPatient,
  getPatientById
} = require("../controllers/patient.controller");

router.post("/", auth, role("admin"), createPatient);
router.get("/:patientId", auth, getPatientById);

module.exports = router;
