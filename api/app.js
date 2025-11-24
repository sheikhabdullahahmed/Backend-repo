// dotenv.config();
// import incomeRoutes from '../routes/incomeRoute.js';
// import expenseRoutes from '../routes/expenseRoute.js';
// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import dotenv from "dotenv";
// import path from "path";
// import { fileURLToPath } from "url";
// import authRoutess from '../routes/authRoute.js'
// import uploadRoute from '../routes/authRoute.js'
// import serverless from "serverless-http";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


// const app = express();

// export const handler = serverless(app);

// // export const handler = serverless(app);

// // Middleware
// app.use(cors({
//   origin: "*",
//   origin: "http://localhost:5173", // ya jahan tumhara React run ho raha hai
//   credentials: true
// }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));



// //Routes
// app.use('/', authRoutess);
// app.use('/upload', uploadRoute);
// app.use('/income', incomeRoutes);
// app.use('/expense', expenseRoutes);

// // Static folder for uploads
// // app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// // app.use("/uploads", express.static("uploads"));



// // MongoDB connection
// mongoose.connect(process.env.DATABASE_URL)
//   .then(() => console.log("Connected"))
//   .catch(err => console.log("MongoDB Connection Failed:", err));


// // app.listen(process.env.PORT || 4000, () => {
// //   console.log(`🟡 Server running on port ${process.env.PORT || 4000}`);
// // });









import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import serverless from "serverless-http";

import authRoutes from "../routes/authRoute.js";
import incomeRoutes from "../routes/incomeRoute.js";
import expenseRoutes from "../routes/expenseRoute.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/income", incomeRoutes);
app.use("/expense", expenseRoutes);

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Error:", err)); 
  

  // good 
const handler = serverless(app);

// IMPORTANT: Vercel requires DEFAULT EXPORT
export default handler;
