require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5000;
const app = express();
app.get("/test", (req, res) => {
  console.log("Test route hit");
  res.send("Server OK");
});

connectDB();

app.use(cors());
app.use(express.json());

// app.use((req, res, next) => {
//   console.log(`${req.method} request to ${req.url}`);
//   next();
// });

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/patients", require("./routes/patient.routes"));
app.use("/api/qr", require("./routes/qr.routes"));

app.listen(process.env.PORT, () => {
  console.log("Auth routes loaded");
  console.log("PORT:", process.env.PORT);
  console.log(`Server running on port ${process.env.PORT}`);
});
