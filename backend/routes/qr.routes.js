const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const Patient = require("../models/Patient");

router.get("/:patientId", auth, async (req, res) => {
  const patient = await Patient.findOne({
    patientId: req.params.patientId
  });

  if (!patient)
    return res.status(404).json({ message: "Invalid QR" });

  res.json(patient);
});

module.exports = router;
