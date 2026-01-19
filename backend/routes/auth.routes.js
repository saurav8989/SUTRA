const express = require("express");
const router = express.Router();
const { login } = require("../controllers/auth.controller"); // correct relative path

router.post("/login", login);

module.exports = router;
    
