import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
// import serverless from "serverless-http";

import authRoutes from "./routes/authRoute.js";
import incomeRoutes from "./routes/incomeRoute.js";
import expenseRoutes from "./routes/expenseRoute.js";
dotenv.config();


const app = express();

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/income", incomeRoutes);
app.use("/expense", expenseRoutes);

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (err) {
    console.log("DB Error:", err);
  }
};

// Call connection immediately
connectDB();


app.listen(5000, () => console.log("server running"));


// Serverless handler
// const handler = serverless(app);
// export default handler;
  