import express from "express";
import dotenv from "dotenv";
import cors from "cors";   // <- import cors

import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import patientRoutes from './routes/patientRoutes.js';
import encounterRoutes from './routes/encounterRoutes.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/encounters', encounterRoutes);

import { notFound, errorHandler } from './middleware/errorMiddleware.js';

app.get("/", (req, res) => {
  res.send("SUTRA Backend Running");
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
