import mongoose from "mongoose";
import { type } from "os";

const ExpenseSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: {type: String, require: true},
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: Date, default: Date.now },
}, { timestamps: true });

const Expense = mongoose.model("Expense", ExpenseSchema);

export default Expense;