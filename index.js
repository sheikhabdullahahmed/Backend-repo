dotenv.config();
import incomeRoutes from './routes/incomeRoute.js';
import expenseRoutes from './routes/expenseRoute.js';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import authRoutess from './controller/authController.js'
import uploadRoute from './routes/authRoute.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();


// Middleware
app.use(cors({
  origin: "http://localhost:5173", // ya jahan tumhara React run ho raha hai
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//Routes
app.use('/', authRoutess);
app.use('/upload', uploadRoute);
app.use('/income', incomeRoutes);
app.use('/expense', expenseRoutes);

// Static folder for uploads
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/uploads", express.static("uploads"));


// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
    });
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error.message);
  }
};

connectDB();


app.listen(process.env.PORT || 4000, () => {
  console.log(`🟡 Server running on port ${process.env.PORT || 4000}`);
});


