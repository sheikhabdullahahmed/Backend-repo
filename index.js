import authRoutes from './routes/authRoute.js';
import incomeRoutes from './routes/incomeRoute.js';
import expenseRoutes from './routes/expenseRoute.js';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();

// Middleware
app.use(cors({origin:process.env.FE_URL}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//Routes
app.use('/auth', authRoutes);
app.use('/income', incomeRoutes);
app.use('/expense', expenseRoutes);

// Static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
mongoose.connect(process.env.URL)
  .then(() => console.log("🟢 MongoDB Connected"))
  .catch((err) => console.error("🔴 MongoDB Error:", err));

app.listen(process.env.PORT || 5000, () => {
  console.log(`🟡 Server running on port ${process.env.PORT || 5000}`);
});


