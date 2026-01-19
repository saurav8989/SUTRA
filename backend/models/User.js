const mongoose = require("mongoose");
// import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: String,
    enum: ["admin", "nurse", "doctor"],
    default: "nurse"
  }
});

module.exports = mongoose.model("User", UserSchema);
