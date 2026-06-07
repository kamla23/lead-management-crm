/* global process */
import express from "express";
import cors  from 'cors';
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import leadRoutes from "./routes/leadRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

dotenv.config();
const app = express();


app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://lead-management-crm-1.onrender.com"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...");
});

connectDB();

app.use("/api/leads", leadRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} `); 
});