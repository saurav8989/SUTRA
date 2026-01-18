import express from "express";
import dotenv from "dotenv";
import cors from "cors";   // <- import cors

dotenv.config();
const app = express();

app.use(cors());           // <- enable CORS
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SUTRA Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
